// ==UserScript==
// @name         Goodreads, show only the "primary works" in a series on series pages
// @namespace    driver8.net
// @version      0.2
// @description  Add a checkbox to Goodreads' book series pages that allows you to hide books that aren't part of the core series/primary works (#0.1, #3.5, etc).
// @author       driver8
// @match        *://*.goodreads.com/series/*
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

(function() {
'use strict';
console.log('Hi core series');

    var newDiv = document.createElement('div');
    newDiv.innerHTML = '<input type="checkbox" id="showCore" name="showcb"> <label for="showCore">Show only primary works</label>';
    newDiv.style.display = 'inline';
    newDiv.style.paddingLeft = '10px';
    document.querySelector('.responsiveSeriesHeader > .responsiveSeriesHeader__subtitle').appendChild(newDiv);
    var cb = newDiv.firstChild;
    cb.checked = GM_getValue('gr_showCore', false);
    showCore(cb.checked);
    cb.addEventListener('change', (evt) => {
        //console.log('checkbox changed', evt);
        showCore(cb.checked);
        GM_setValue('gr_showCore', cb.checked);
    });

    function showCore(show) {
        var allRows = Array.from(document.querySelectorAll('.responsiveSeriesList > div'));
        //console.log('all rows', allRows);
        if (!show) {
            allRows.forEach((el) => { el.hidden = false; });
        } else {
            var notmatching = allRows.filter((el) => {
                var rid = el.dataset.reactid + '.0.0.0.1';
                var book = document.querySelector('[data-reactid="' + rid + '"]');
                book = book && book.innerText
                return ! /^\s*#?\d+\s*$/i.test(book);
            });
            //console.log('not matching', notmatching);
            if (notmatching.length !== allRows.length) {
                notmatching.forEach((el) => { el.hidden = true; });
            }
        }
    }
})();