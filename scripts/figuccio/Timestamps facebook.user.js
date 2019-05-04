// ==UserScript==
// @name     Timestamps facebook
// @match    https://www.facebook.com/*
// @match    https://*.facebook.com/*
// @match    http://www.facebook.com/*
// @match    http://*.facebook.com/*
// @run-at   document-start
// @grant    GM_addStyle
// @author   figuccio
// @require  https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// @ require  https://momentjs.com/downloads/moment.min.js
// @ require  https://momentjs.com/downloads/moment-with-locales.min.js
// @version 1.1
// @description stampa data e ore 24ore Facebook post
// @namespace https://greasyfork.org/users/237458
// ==/UserScript==

var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: '2-digit'};

GM_addStyle(
    '.full-timestamp { opacity: 0.95; color: #f00!important; }' +
    '.full-timestamp:hover { opacity: 1.0; }' +
'.timestampContent {display: inline-block; }'

);

// elaborare la parte già caricata della pagina, se presente
expandDates(document.querySelectorAll('abbr[data-utime]'));

// elaborare le cose aggiunte da ora in poi
setMutationHandler(document, 'abbr[data-utime]', expandDates);
setMutationHandler(document, '._5pcq', expandPostIDs);

function expandDates(nodes) {
    for ( var i = 0, abbr; (abbr = nodes[i++]); )
{
        if (abbr.querySelector('.full-timestamp')) {
            // già elaborato
            continue;
        }

        abbr.insertAdjacentHTML(
        'beforeend', '<span class="full-timestamp">'
        + ' ' + moment(new Date(abbr.dataset.utime * 1000)).format('dddd-DD/M/Y\\ -H:mm:ss')
        );
    }
}
