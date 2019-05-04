// ==UserScript==
// @name         full timestamps febbraio 2019
// @match        https://www.facebook.com/*
// @match        https://apps.facebook.com/*
// @run-at   document-start
// @author      figuccio
// @version   1.1
// @description Shows full timestamps on Facebook posts
// @grant    GM_addStyle
// @require  https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// @namespace https://greasyfork.org/users/237458
// ==/UserScript==

GM_addStyle(
    '.full-timestamp { opacity: 1.0; color: #f00!important;}' +

     '.timestampContent {display: inline-block; }'

);

//  elaborare la parte già caricata della pagina, se presente
expandDates(document.querySelectorAll('abbr[data-utime]'));

// elaborare le cose aggiunte da ora in poi
setMutationHandler(document, 'abbr[data-utime]', expandDates);

function expandDates(nodes) {
    for (var i = 0, abbr; (abbr = nodes[i++]); ) {
        if (abbr.querySelector('.full-timestamp')) {
            // gia elaborato
            continue;
        }
       abbr.insertAdjacentHTML('beforeend', '<span class="full-timestamp">' +
            new Date(abbr.dataset.utime * 1000).toLocaleString('ITA',{weekday:'long',hour:'numeric',minute:'numeric',second:'numeric',day :'numeric',month :'long',year:'numeric',}) +'</span>');

    }
}
