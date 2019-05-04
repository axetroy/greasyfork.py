// ==UserScript==
// @name		Power LinkedIn－Connect/Open All Contacts, Skip Add Note, Expand Profile & Visited Link Color Options
// @version		2.0.0
// @description	Automates & Extends LinkedIn with 1) Connect to all contacts (and optionally open in tab when can't), 2) Skip Add Note prompt, 3) Expand all Profile Sections (for easier searching), 4) Show visited contact link colors. Features can be configured or disabled by editing top of script. | By Dan Moorehead (dan@PowerAccessDB.com), PowerAccess™ for Microsoft Access & PowerSQL™ (https://www.PowerAccessDB.com) & Visual3D Game Engine founder (http://Visual3D.net)
// @author		Dan Moorehead (dan@PowerAccessDB.com), PowerAccess™ for MS Access & PowerSQL™ (https://www.PowerAccessDB.com/PowerAccess-PowerSQL-MS-Access-BI) and Visual3D Game Engine founder
// @copyright	© 2017 Dan Moorehead (dan@PowerAccessDB.com), PowerAccess™ for MS Access & PowerSQL™ (https://www.PowerAccessDB.com/PowerAccess-PowerSQL-MS-Access-BI) and Visual3D Game Engine founder
// @include		/^https?://(www\.)?linkedin\.com(/.*)?$/
// @namespace	https://www.PowerAccessDB.com/
// @homepage	https://www.poweraccessdb.com/PowerAccess-PowerSQL-MS-Access-BI
// @supportURL	https://greasyfork.org/en/scripts/31771-linkedin-auto-send-now-connect-requests-for-contacts-skipping-add-a-note-prompt
// @require		https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant       none
// @icon		data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFXRFWHRDcmVhdGlvbiBUaW1lADYvMjQvMDn2wWvjAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M0BrLToAAAAY9QTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWJ+8Upq2DFJ4BklsVJu4CU1zCU5zTpWyV5+7DlN4B0twB0tvCU50C1mEC1+NDFF3DGWWDmSRD2iYEFV5EmuaE1d7FGeTFVp9FWGKFW2cGFyAGHCeGmCDG3OgHWKFHnWiIGSHIXikI2iLJHumJmuNKG6PKH2oK3CSK4CrLnSVLoOtL2iDMHaXMYavM3maNHOQNIixNXaUNnycN4uzOX6eOX+fOo21O3SLPIKiPY2yPY2zPZC3PoqtP4WkP42xQJO5QoinQ5W7RYuqRpi9SIOfSI+sSZu/S5KvS5OwTJ3BTpe6T6DDUYGXUpq2UqPFVZy5VabHV566WKjJWafHW4eaW6vLXaHAYa7NYqC+Yq3MY6LBZ6K9aq7Kbq3Hc7LMdJindbjTgbTLhL/VicDXi6u5j8TZornErL7GuMbNxdDVy9ng1dzg19fX2tra3Nzc3ODh3t7e5ubm6Ojo6urq7e3t7+/v8fHx9PT09vb2+fn5+/v7/f39/////8EcrgAAABN0Uk5TAAEFBgcSFxiGh4+a1Nra4+Pm6f7wNSIAAAFdSURBVDjLrZM7T8NAEIS/tTfOA0hogIqHgJKWv4BA8HNB/AsaKjoEgoKHCDKKbdZ3RxEHUHKWKJhmdJrRzu7enQC93gkxXJYlCCyfjjpJRPf2fvGB0D9b84WPGJJ+8nxeKNlqUUUTnHVXsyLleDAJIRRPuaZhDnW2fqNM62/sk78tFCk8iisBhjB8WUxxKN4DCBDp1KM4B5CPeHeRRlEsA7iLDoKhOA/wBKxjb9Dv5TVkK+mswtRwBFyxfQj5+KAPk4fXrDHU9azJGhPobAEs7ZUFUJPgzcxMRMTsVkQGIiIiumtm9jOFAG5Kk1t2BtBxTYSfN4wfGS7BwDV7WDBcw93W9IhHCfMGB+OGCfOrnm18xv5PhkjEN/t/iXDpz+X/JjzgEDYz2vF5r3hLW3XnUSYjazVojlIVibTowSpUSs1Eol8vhKoUSVLpdOMlQmXBKTRvqgUiItKqhhC+ALfVx6MKijHaAAAAAElFTkSuQmCC
// ==/UserScript==


//************ NOTES: ************
//
// Temporarily disable Auto Send Now so you can customize Connect note by adding "connectNote&" to the URL (either after the /? or after adding a ? to the URL if one doesn't already exist) in address bar and pressing Enter.
//
// User Settings: You can enable/disable features by editing the USER SETTINGS: section below, or or change advanced behavior there, by, for example, changing between "= true" and "= false" there
//
// You may be able to slightly optimize this by changing the INCLUDE: rule above to the following, to restrict from running on some pages where is less likely to be needed, though doing so isn't always reliable
//  /^https?://(www\.)?linkedin\.com/(search/results/people/|in/).*$/
//
// To change what pages this runs on without editing this script, you can use the add-in to add a user include rule, such as by going to something like:
//      Greasemonkey (or Tampermonkey, Violentmonkey, etc. - whatever your add-in is) > Dashboard (or Options) > (the name of this LinkedIn Script) > Settings > Includes/Excludes > "Add User Include":
//
// TO-DO:
//
// * Maybe add a settings page you can visit to more easily edit settings without changing the script if have time, such as via one of these methods: https://stackoverflow.com/questions/14594346/create-a-config-or-options-page-for-a-greasemonkey-script/43462416#43462416
// * Anyone, please feel free to improve this script (such as by adding a user settings dialog) and contact me with an updated version to publish
//
//************ END OF NOTES: ************


$(function () {
    'use strict';   //enable function-level strict syntax mode

    //************ USER SETTINGS: ************

    //NOTE: If true, this prevents user from being able to Add Note for customized Connect request.
    var autoSendNowOnConnect = true;
    var autoExpandProfileDescription = true;

    //contact cards open with URL ending in ?lipu=... while search result, etc. links don't have that, so need to temporarily open URL without query string via iframe to add to browser history
    //if enabled, this will allow visited link color to show up in contact search results, suggested contacts, etc.
    var enableVisitedLinkColorForContacts = true;
    var visitedLinkColorOverride = false;
    var visitedLinkColor = '#6633FF';
    var autoExpandPositions = true;
    var autoExpandSkills = true;

    var autoScrollToBottomBeforeTopForAutoSkillExpand = true;
    var autoScrollToTopAfterExpanding = true;

    var allowCustomizedConnectNoteQueryParam = 'connectNote';
    var autoClickAllConnectButtonsQueryParam = 'autoConnect';
    var autoClickAllConnectButtonsAndOpenInTabOthersQueryParam = 'autoConnectOpen';

    //NOTE: These options can be dangerous to set to true, any profile page visited and any suggested contacts in sidebar, etc. will have automatic connect request
    //so suggested to instead just append &autoConnect or ?autoConnect as query string to end of URL you want to do this for.
    var autoClickAllConnectButtonsOnAllPagesWithoutQueryParam = false;
    var autoOpenAllNonSearchResultContactsWithoutConnectButton = false;

    var buttonBackgroundColorAfterClicked = '#ccc';
    var testWithoutClick = false;
    var logMessagePrefix = '[Power LinkedIn] ';

    //************ END OF USER SETTINGS ************


    //************ SELECTORS - TO FIND BUTTONS TO CLICK: Customize only if broken due to LinkedIn changes: ************

    //CSS selector to find any button with text "Send now" which is in an Invite actions modal dialog overlay
    var sendNowOnConnectSelector = 'section.modal div.send-invite__actions > button.button-primary-large.ml3:contains("Send now")';
    var expandProfileSelector = 'button.pv-top-card-section__summary-toggle-button.button-tertiary-small.mt4:contains("See more")';
    var searchContactsConnectButtonSelector = 'button.search-result__actions--primary.button-secondary-medium.m5';
    var networkSuggestionsConnectButtonChildSelector = 'li.mn-pymk-list__card > div.mn-pymk-list__action-container > button.button-secondary-small[data-control-name="invite"] > span:contains("Connect")';
    var connectButtonOnProfileSelector = 'button.connect.primary.top-card-action';
    var connectMenuItemUnderMoreSelector = 'li.action.connect.overflow span.default-text';
    var moreContactActionsMenuButtonSelector = 'button.pv-top-card-overflow__trigger.button-secondary-large-muted.dropdown-trigger';
    var expandSkillsSelector = 'button.pv-skills-section__additional-skills';
    var expandPositionsSelector = 'button.pv-profile-section__see-more-inline';
    var searchContactsInMailConnectLinkSelector = 'div.search-result__actions > div.ember-view > div.ember-view[data-control-name="send_inmail"]';
    var searchContactsProfileLinkSelector = ' a.search-result__result-link'; //OR: a[data-control-name="search_srp_result"]
    var navBarSelector = 'ul.nav-main.nav-container';
    var navBarAfterSelector = 'ul.nav-side.nav-container';
    var profileNavItem = '#profile-nav-item';

    //************ END OF SELECTORS ************


    //Utility Functions:


    function log(message) {
         console.log(logMessagePrefix + message);
    }

    function getUrlParam(name) {
        //also handles ' ?paramName' with no = or value. If don't want to allow it, then instead use '=([^&#]*)'
        var results = new RegExp('[\?&]' + name + '(=([^&#]*)|(?=[&#])|$)').exec(window.location.href);
        if (results === null) {
            return null; //param not found
        } else {
            return decodeURI(results[1]); //OR: with ' || 0;' to change empty string to 0, for case like "&paramName=&otherParam=val"
        }
    }

    //Advanced Behavior Determined:

    //if user adds "?connectNote="" to the URL of page their visiting, then skip auto-Clicking "Send now" button on Connect
    if(getUrlParam(allowCustomizedConnectNoteQueryParam) !== null) {
        //disable auto send now, just for this page vist
        autoSendNowOnConnect = false;
    }

    var autoOpenContacts = false;
    var autoConnect = autoClickAllConnectButtonsOnAllPagesWithoutQueryParam || getUrlParam(autoClickAllConnectButtonsQueryParam) !== null;

    if (autoOpenAllNonSearchResultContactsWithoutConnectButton || getUrlParam(autoClickAllConnectButtonsAndOpenInTabOthersQueryParam) !== null) {
        autoConnect = true;
        autoOpenContacts = true;
    }

    //enable handling late added elements (such as Send now button), if needed, depending on options enabled
    var handleLateLoaded = autoSendNowOnConnect;


    //More Utility Functions:

    //find any elements via selector either within whole document or that are within or descendants of members of limitToNodes list
     function findAll(selector, limitToNodes, goUpParentLevels) {

        var found;

        if(limitToNodes) {
            //find in descendants of added nodes + then inspect the addedNodes themselves too
            found = $(limitToNodes).find(selector).addBack(selector);
        } else {
            found = $(selector);
        }


        if(goUpParentLevels) {
            for(var i = 0; i < goUpParentLevels; i++) {
                found = found.parent();
            }
        }
        return found;

    }

    //find any elements via selector either within whole document or that are within or descendants of members of limitToNodes list
    //then perform click
    function clickAll(selector, limitToNodes, clickSendAfterEach, goUpParentLevels) {

        //alert('finding');
        //log("Searching for buttons to auto click: " + selector);

        findAll(selector, limitToNodes, goUpParentLevels).each( function() {
            log('Clicking: ' + this.id + " = " + this['aria-label'] );

            //show user this button has already been clicked
            this.style.backgroundColor = buttonBackgroundColorAfterClicked;

            if(!testWithoutClick) {
                this.click(); //.trigger('click');
            }

            if(clickSendAfterEach) {
                clickAll(sendNowOnConnectSelector, limitToNodes);
            }

       } );
    }
    function addGlobalStyle(css) {
        var head = document.getElementsByTagName('head')[0];
        if (!head)
            return;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }


    //contact cards open with URL ending in ?lipu=... while search result, etc. links don't have that, so need to temporarily open URL without query string via iframe to add to browser history
    //if enabled, this will allow visited link color to show up in contact search results, suggested contacts, etc.
    if(enableVisitedLinkColorForContacts)
    {
        var url = window.location.href;
        var matches = new RegExp('^(https?://[^.]*\.linkedin\.com/in/[^?]+)\?').exec(url);
        if(matches)
        {
            var urlWithoutQueryString = matches[1];
            //alert(urlWithoutQueryString);

            log("Loading profile in background temporarily to enable visited link color: " + url);

            var iframe = document.createElement('iframe');
            iframe.setAttribute('id', 'iframe-for-visited-link-color'); // assign an id
            // assign url
            iframe.setAttribute('src', urlWithoutQueryString);

            //ensure iframe is always hidden
            iframe.style.display = 'none';

            //remove the iframe as soon as it has begun to load
            iframe.onload = function() { iframe.parentNode.removeChild(iframe); };

            // place at end of document
            document.body.appendChild(iframe);
        }
    }

    if(visitedLinkColorOverride) {
        //show visited links for contacts in different color (Purple), so know who already checked out, since LinkedIn seems to override that behavior just for contacts
        addGlobalStyle('body a:visited { color: ' + visitedLinkColor + ' !important; }');
    }

    var isObserverSetup = false;

    function setupLateLoadObserver() {

        if (isObserverSetup)
            return;
        isObserverSetup = true;

        //create alias of MutationObserver class for whatever browser-specific class name is
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        //create observer to inspect elements as added to DOM
        var config = { childList: true, characterData: false, attributes: false, subtree: true };
        var observer = new MutationObserver( function (mutations) {
            mutations.forEach( function (mutation) {

                if (mutation.addedNodes) {

                    clickAllWhereEnabled(mutation.addedNodes);

                }
            });
        });

        //begin observing any node additions anywhere in the document
        observer.observe(document, config);
    }

    function createNavButton(label, name, onClick) {

        if(!name)
            name = label;

        var btn = document.createElement("li");
        btn.id = 'PowerLinkedIn-NavItem-' + name;
        btn.className = 'nav-item PowerLinkedIn-NavItem';

        var a = document.createElement("a");
        a.id = btn.id + '-link';
        a.className = 'nav-item__link js-nav-item-link PowerLinkedIn-NavItem-Link';

        a.onclick = onClick;

        a.innerHTML = '<span id="PowerLinkedIn-ConnectAll-Icon" class="nav-item__icon" aria-role="presentation" lang="en"><li-icon aria-hidden="true" type="nav-small-ConnectAll-icon" color="true">'
            + '<svg viewBox="0 0 290.626 290.626" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="nav-icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 290.626 290.626" height="24px" width="24px"><path d="M154.771 34.847c5.531-3.267 9.291-9.225 9.291-16.097 0-10.341-8.409-18.75-18.75-18.75s-18.75 8.409-18.75 18.75c0 6.872 3.759 12.83 9.291 16.097-8.217 3.647-13.978 11.85-13.978 21.403v4.688c0 2.588 2.095 4.688 4.688 4.688h14.063v32.813h9.373v-32.814h14.063c2.592 0 4.688-2.1 4.688-4.688v-4.687c-.001-9.553-5.762-17.756-13.979-21.403zm-9.459-25.472c5.17 0 9.375 4.205 9.375 9.375s-4.205 9.375-9.375 9.375-9.375-4.205-9.375-9.375 4.204-9.375 9.375-9.375zm-14.063 46.875c0-7.753 6.309-14.063 14.063-14.063s14.063 6.309 14.063 14.063h-28.126zM9.374 98.438h37.5c2.592 0 4.688-2.1 4.688-4.688v-.619l48.961 32.644 5.198-7.8-55.739-37.158c-2.222-5.869-6.694-10.622-12.403-13.158 5.536-3.267 9.295-9.225 9.295-16.097 0-10.341-8.409-18.75-18.75-18.75s-18.75 8.409-18.75 18.75c0 6.872 3.759 12.83 9.291 16.097-8.217 3.647-13.978 11.85-13.978 21.403v4.688c-.001 2.588 2.095 4.688 4.687 4.688zm18.75-56.25c5.17 0 9.375 4.205 9.375 9.375s-4.205 9.375-9.375 9.375-9.375-4.205-9.375-9.375 4.204-9.375 9.375-9.375zm0 32.812c7.753 0 14.063 6.309 14.063 14.063h-28.126c0-7.754 6.31-14.063 14.063-14.063zM271.959 67.659c5.531-3.267 9.291-9.225 9.291-16.097 0-10.341-8.409-18.75-18.75-18.75s-18.75 8.409-18.75 18.75c0 6.872 3.759 12.83 9.291 16.097-5.709 2.536-10.181 7.289-12.403 13.158l-55.739 37.158 5.198 7.8 48.966-32.644v.619c0 2.588 2.095 4.688 4.688 4.688h37.5c2.592 0 4.688-2.1 4.688-4.688v-4.688c-.002-9.553-5.763-17.756-13.98-21.403zm-9.46-25.471c5.17 0 9.375 4.205 9.375 9.375s-4.205 9.375-9.375 9.375-9.375-4.205-9.375-9.375 4.205-9.375 9.375-9.375zm-14.062 46.875c0-7.753 6.309-14.063 14.063-14.063 7.753 0 14.063 6.309 14.063 14.063h-28.126zM271.959 198.909c5.531-3.262 9.291-9.22 9.291-16.097 0-10.341-8.409-18.75-18.75-18.75s-18.75 8.409-18.75 18.75c0 6.877 3.759 12.834 9.291 16.097-2.592 1.153-4.945 2.742-6.942 4.706l-55.927-38.719-5.339 7.711 56.016 38.78c-1.139 2.752-1.786 5.761-1.786 8.925v4.688c0 2.592 2.095 4.688 4.688 4.688h37.5c2.592 0 4.688-2.095 4.688-4.688v-4.688c-.002-9.553-5.763-17.756-13.98-21.403zm-9.46-25.471c5.17 0 9.375 4.205 9.375 9.375s-4.205 9.375-9.375 9.375-9.375-4.205-9.375-9.375 4.205-9.375 9.375-9.375zm-14.062 46.875c0-7.753 6.309-14.063 14.063-14.063 7.753 0 14.063 6.309 14.063 14.063h-28.126zM154.771 259.847c5.531-3.262 9.291-9.22 9.291-16.097 0-8.714-5.995-15.989-14.063-18.084v-33.478h-9.375v33.478c-8.067 2.095-14.063 9.37-14.063 18.084 0 6.877 3.759 12.834 9.291 16.097-8.217 3.647-13.978 11.85-13.978 21.403v4.688c0 2.592 2.095 4.688 4.688 4.688h37.5c2.592 0 4.688-2.095 4.688-4.688v-4.688c-.001-9.553-5.762-17.756-13.979-21.403zm-9.459-25.472c5.17 0 9.375 4.205 9.375 9.375s-4.205 9.375-9.375 9.375-9.375-4.205-9.375-9.375 4.204-9.375 9.375-9.375zm-14.063 46.875c0-7.753 6.309-14.063 14.063-14.063s14.063 6.309 14.063 14.063h-28.126zM100.457 164.897l-55.927 38.719c-1.997-1.964-4.35-3.553-6.942-4.706 5.527-3.263 9.286-9.22 9.286-16.097 0-10.341-8.409-18.75-18.75-18.75s-18.75 8.409-18.75 18.75c0 6.877 3.759 12.834 9.291 16.097-8.217 3.647-13.978 11.85-13.978 21.403v4.687c0 2.592 2.095 4.688 4.688 4.688h37.5c2.592 0 4.688-2.095 4.688-4.688v-4.688c0-3.164-.647-6.173-1.786-8.925l56.016-38.78-5.336-7.71zm-72.333 8.541c5.17 0 9.375 4.205 9.375 9.375s-4.205 9.375-9.375 9.375-9.375-4.205-9.375-9.375 4.204-9.375 9.375-9.375zm-14.063 46.875c0-7.753 6.309-14.063 14.063-14.063s14.063 6.309 14.063 14.063h-28.126z" fill="#fff"></path><path d="M145.312 196.875c-28.43 0-51.563-23.133-51.563-51.563s23.133-51.563 51.563-51.563 51.563 23.133 51.563 51.563-23.134 51.563-51.563 51.563z" fill="#fff"></path><path d="M154.771 142.659c5.531-3.267 9.291-9.225 9.291-16.097 0-10.341-8.409-18.75-18.75-18.75s-18.75 8.409-18.75 18.75c0 6.872 3.759 12.83 9.291 16.097-8.217 3.647-13.978 11.85-13.978 21.403v4.688c0 2.592 2.095 4.688 4.688 4.688h37.5c2.592 0 4.688-2.095 4.688-4.688v-4.688c-.002-9.553-5.763-17.756-13.98-21.403zm-9.459-25.471c5.17 0 9.375 4.205 9.375 9.375s-4.205 9.375-9.375 9.375-9.375-4.205-9.375-9.375 4.204-9.375 9.375-9.375zm-14.063 46.875c0-7.753 6.309-14.063 14.063-14.063s14.063 6.309 14.063 14.063h-28.126z" fill="#fff"></path></svg>'
            + '</li-icon></span>'
            + '<span class="nav-item__title">' + label + '</span>';

        btn.appendChild(a);

        //$(profileNavItem).before(btn);

        $(navBarAfterSelector).prepend(btn);

    }


    function connectToAll(fallbackToOpenInTab, addedNodes) {

        //my network page > suggestions
        clickAll(networkSuggestionsConnectButtonChildSelector, addedNodes, false, 1); //go up 1 parent level

         //for Search results page:
        clickAll(searchContactsConnectButtonSelector, addedNodes, autoConnect);

        //for Profile page:
        //TODO: Restrict to /in/ page URL

        clickAll(moreContactActionsMenuButtonSelector, addedNodes, autoConnect);

        //click Connect for profile page with actual Connect button shown
        clickAll(connectButtonOnProfileSelector, addedNodes, autoConnect);

        //click Connect for profile page with Connect menu item hidden/delay created under More... drop-down actions menu
        clickAll(connectMenuItemUnderMoreSelector, addedNodes, autoConnect);

        //TODO: See if need to also call below for SendNow auto click after each .click() performed by clickAll()

        //click Send now button if popup modal dialog is shown, instead of allowing clicking Add Note for customized connect request
        if(autoSendNowOnConnect) {
            clickAll(sendNowOnConnectSelector, addedNodes);
        }

        //start opening contacts in new tabs in background before click Connect buttons
        if(fallbackToOpenInTab) {

            //go up 3 levels to div.search-result__wrapper, then back down to the profile link
            findAll(searchContactsInMailConnectLinkSelector, addedNodes, 3).find(searchContactsProfileLinkSelector).each(function() {
                var profileRelativeUrl = $(this).href;
                openInNewTab(profileRelativeUrl);
            });
        }
    }

    function onConnectAllClick(openNonConnectable) {

        autoConnect = true;

        if(openNonConnectable) {
            autoOpenContacts = true;
        }

        //if haven't already done so, create observer to watch for late loaded nodes now
        setupLateLoadObserver();

        //alert("Clicked Connect to All");

        //click everything supposed to now
        connectToAll(openNonConnectable);
    }


    //create buttons in nav bar for automation actions
    //last added nav item is displayed first


    //create 'Connect/Open All' button at end of main nav bar now
    createNavButton('Connect/Open', 'Connect-Open-All', function() { onConnectAllClick(true); });

    //create 'Connect All' button at end of main nav bar now
    createNavButton('Connect All', 'Connect-All', function() { onConnectAllClick(false); });


    function scrollTo(bottomInsteadOfTop) {

        var height = bottomInsteadOfTop ? document.body.scrollHeight : 0;

        window.scrollTo(0, height);
    }

    function toUrl(urlOrLinkElement) {
        try {
            if (typeof urlOrLinkElement === 'string') {
                return urlOrLinkElement;
            } else {
                return urlOrLinkElement.href;
            }
        } catch (e) {
        }
    }

    function openInNewTab(urlOrLinkElement) {

        log("Opening url in new tab: " + url);

        var url = toUrl(urlOrLinkElement);
        if(url) {
            window.open(url, '_blank');
        }
    }


    function clickAllWhereEnabled(addedNodes) {

        var isFirstLoad = !addedNodes;

        //AUTO EXPAND SECTIONS:

        //isFirstLoad restricts to only expanding sections on page load, so don't check each delay loaded element for it
        //if (isFirstLoad) {

        if(autoExpandProfileDescription) {
            clickAll(expandProfileSelector, addedNodes);
        }

        var scrollToBottom = false;
        var scrollToTop = false;

        if(autoExpandPositions) {
            clickAll(expandPositionsSelector, addedNodes);
            scrollToTop = true;
        }

        if(autoExpandSkills) {
            clickAll(expandSkillsSelector, addedNodes);

            scrollToTop = true;

            if (autoScrollToBottomBeforeTopForAutoSkillExpand) {
                scrollToBottom = true;
            }
        }

        if(isFirstLoad) {

            //after expanding, may need to scroll back to the top of page
            if(autoScrollToTopAfterExpanding && scrollToTop) {
                if (scrollToBottom) {
                    scrollTo(true);
                }
                scrollTo(false);
            }
        }

        if(autoConnect) {
            connectToAll(autoOpenContacts, addedNodes);
        }

    }
    //Perform Script Behavior:



    //begin handling late added elements (such as Send now button), if needed, depending on options enabled
    if (handleLateLoaded) {
        setupLateLoadObserver();
    }

    clickAllWhereEnabled();

});