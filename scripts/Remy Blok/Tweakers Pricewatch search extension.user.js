// ==UserScript==
// @name         Tweakers Pricewatch search extension
// @namespace    http://remyblok.tweakers.net/
// @version      0.1
// @description  Add additional search and filter functions  to the Tweakers Pricewatch
// @author       Remy Blok
// @match        https://*.tweakers.net/*
// @run-at       document-idle
// @grand        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

var debug = false;

function FilterFormExtended(filterForm) {
    this.filterForm = filterForm;
    this.originalHandleAjaxResponse = null;
}

Object.extend(FilterFormExtended.prototype, {
    init: function () {
        this.hideMoreLinks();
    },
    hideMoreLinks: function () {
        if (!filterForm.listing) return;
        // find all the links more/less options link
        var links = Selector('.showLink, .hideLink');
        var i = 0, link;
        while ((link = links[i++])) {
            //this is the id of the div element of the current filter
            var filterName = link.parentNode.parentNode.id;

            //just a check to see the scipt is working
            if (debug)
                link.innerHTML = link.innerHTML + " extended";

            // we want additional things to happen when the user clicks on the link
            this.filterForm.addSimpleEvent(link, 'onclick', this.toggleHideMore);

            // creating HTML, could be rendered at the server
            this.generateHtml(link, filterName);

            //select the ul element of the extended filter
            var ul = Selector('#' + filterName + '_extendedFilter', link.parentNode)[0];

            // get the actual filter element
            var filter = Selector('#' + filterName + '_filter', ul)[0];
            filter.onkeyup = this.filterList;

            // get the actual select all element
            var selectAllCheckbox = Selector('#' + filterName + '_selectall', ul)[0];
            selectAllCheckbox.onclick = this.selectAll;

            // create a options bag to store key references into
            var options = {};
            options.filterName = filterName;
            options.filterElement = filter;
            options.filterContainer = ul;
            options.selectAllCheckbox = selectAllCheckbox;
            // figure out what option values there are in the filer
            // we need to exclude the li elements from the extended filter
            options.optionsElements = Selector('ul:not(#' + ul.id + ') li', link.parentNode);

            filter.options = options;
            selectAllCheckbox.options = options;
            link.options = options;

            // trigger the initial visibility
            this.toggleHideMore.call(link);
        }

        // replace the original handleAjaxResponse method so we can inject our onw code first.
        this.originalHandleAjaxResponse = this.filterForm.handleAjaxResponse;
        this.filterForm.handleAjaxResponse = this.handleAjaxResponse;
    },
    generateHtml: function (link, filterName) {
        var html =
            ('<li>' +
                '<input type="text" id="{filterName}_filter" name="extendedFilter" class="text" placehoder="Filter">' +
            '</li>' +
            '<li>' +
                '<label for="{filterName}_selectall" class="checkbox">' +
                    '<span class="inputWrapper">' +
                        '<input type="checkbox" name="extendedSelectall" id="{filterName}_selectall" value="{filterName}_selectall">' +
                    '</span> ' +
                    '<span title="Alles Selecteren" class="facetLabel"><b>Alles Selecteren</b></span>' +
                '</label>' +
            '</li>').replace(/{filterName}/g, filterName);

        // add the a new ul to the page
        // separate ul used so that is can be easily hidden
        var ul = document.createElement('ul');
        ul.id = filterName + "_extendedFilter";
        ul.innerHTML = html;
        link.parentNode.insertBefore(ul, link.previousSibling.previousSibling); // before the link there ar two ul elements, we place it above these two elements
    },
    handleAjaxResponse: function (response) {
        // validate the data is OK
        var data = checkJsonResponse(response);

        // because the querystring returned from the server does not include the extended field these need to be added
        // otherwise the original handleAjaxResponse will clear the form, and not reset the values
        if (data && 'querystring' in data) {

            // first we do all the select all comboboxes
            var selectAlls = Selector("[name='extendedSelectall']");
            var i = 0, selectAll;

            data.querystring.extendedSelectall = [];
            while ((selectAll = selectAlls[i++])) {
                if (selectAll.checked)
                    data.querystring.extendedSelectall[data.querystring.extendedSelectall.length] = selectAll.value;
            }

            // now the do the user typed filer
            var filters = Selector("[name='extendedFilter']");
            var j = 0, filter;

            // we check if there is a value filled in and then add it to the query string.
            while ((filter = filters[j++])) {
                if (filter.value && filter.value !== '' )
                    data.querystring[filter.id] = filter.value;
            }
        }

        // call the original method
        filterFormExtended.originalHandleAjaxResponse.call(this, response);
    },
    // 'this' is the 'a'-element of the show/hide more link
    toggleHideMore: function () {
        // because the original code has already run the check is the other way around
        if (this.className != /*==*/ 'showLink') {
            removeClass(this.options.filterContainer, 'hideMore');
        } else {
            addClass(this.options.filterContainer, 'hideMore');
            // reset the filter and make sure all options are visible again
            removeClass(this.options.selectAllCheckbox.parentNode.parentNode, 'selected');
            this.options.selectAllCheckbox.checked = false;
            this.options.filterElement.value = '';
            filterFormExtended.filterList.call(this.options.filterElement);
        }
    },
    // onKeyUp event of the filter box
    // 'this' is the 'input'-element text filter
    filterList: function () {
        // we don't want to be case sensitive
        var searchString = this.value.toLowerCase();
        var i = 0, li, needsScreenUpdate = false, shownItems = 0, checkedItems = 0;
        // loop over all options within this filter to see if they match
        // if they don't match we hide them, oterwise we show them
        // it also keeps track of the state of the checkbox before it was hidden
        // so then when it is shown again we can reset the correct state
        while ((li = this.options.optionsElements[i++])) {
            var label = singleOrNull(Selector('.facetLabel', li));
            var checkbox = singleOrNull(Selector('input', li));
            if (label !== null && checkbox !== null) {
                // do the string comparision, also here lower case
                if (label.innerText.toLowerCase().contains(searchString)) {
                    // if it is currently hidden, we need to make it visible
                    if (li.className == 'hideMore') {
                        removeClass(li, 'hideMore');
                        // restore the state of check box from before the filter
                        if (checkbox.checkedBeforeFilter)
                            checkbox.checked = checkbox.checkedBeforeFilter;
                        checkbox.checkedBeforeFilter = checkbox.checked;
                        // if a checked option is now visible we need to refresh the screen
                        needsScreenUpdate |= checkbox.checked;
                    }
                    shownItems++;

                    if (checkbox.checked)
                        checkedItems++;
                }
                // only hide it if it is not already hidden
                // otherwise we override the checkedBeforeFilter state
                else if (li.className != 'hideMore') {
                    addClass(li, 'hideMore');
                    // if a checked option is now hidden we need to refresh the screen
                    needsScreenUpdate |= checkbox.checked;
                    checkbox.checkedBeforeFilter = checkbox.checked;
                    // make sure the option in no longer checked
                    checkbox.checked = false;
                }
            }
        }
        // disable the select all button if there are no options
        this.options.selectAllCheckbox.disabled = shownItems === 0;

        // show the selected all button as selected if all filter options are selected
        if (shownItems > 0 && checkedItems === shownItems) {
            addClass(this.options.selectAllCheckbox.parentNode.parentNode, 'selected');
            this.options.selectAllCheckbox.checked = true;
        } else {
            removeClass(this.options.selectAllCheckbox.parentNode.parentNode, 'selected');
            this.options.selectAllCheckbox.checked = false;
        }

        // finally update the page with the selected options if needed
        if (needsScreenUpdate)
            filterForm.ajaxTimer();
    },
    // onClick event of the selected all combobox
    // 'this' is sthe 'input'-element combobox
    selectAll: function (e) {
        var i = 0, li, needsScreenUpdate = false;
        // loop over all options, check if there are not hidden due to the text filter
        // then check the options
        while ((li = this.options.optionsElements[i++])) {
            if (!this.checked || li.className != 'hideMore') {
                var checkbox = singleOrNull(Selector('input', li));
                if (checkbox !== null) {
                    // only update the screen if the checkbox is switched from state
                    needsScreenUpdate |= (checkbox.checked != this.checked);
                    checkbox.checked = this.checked;
                }
            }
        }
        // finally update the page with the selected options if needed
        if (needsScreenUpdate)
            filterForm.ajaxTimer();
    },
});

// little helper function to get the first element from an array
function singleOrNull(array) {
    if (Array.isArray(array) && array.length == 1)
        return array[0];
    return null;
}

// init the code
if (unsafeWindow.filterForm) {
    var filterFormExtended = new FilterFormExtended(filterForm);
    filterFormExtended.init();
}
})();