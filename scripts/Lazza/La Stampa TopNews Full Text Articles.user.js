// ==UserScript==
// @name         La Stampa TopNews Full Text Articles
// @namespace    https://andrealazzarotto.com
// @version      1.1.3
// @description  Uncovers the "paywalled" articles on La Stampa TopNews
// @author       Andrea Lazzarotto
// @match        http://www.lastampa.it/*/premium.html
// @match        https://www.lastampa.it/*/premium.html
// @require      https://code.jquery.com/jquery-latest.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* Greasemonkey 4 wrapper */
if (typeof GM !== "undefined" && !!GM.xmlHttpRequest) {
    GM_xmlhttpRequest = GM.xmlHttpRequest;
}

function fetch(params) {
    return new Promise(function(resolve, reject) {
        params.onload = resolve;
        params.onerror = reject;
        GM_xmlhttpRequest(params);
    });
}

(function() {
    'use strict';

    fetch({
        method: 'GET',
        url: location.href.replace('/premium.html', '/print.html'),
    }).then(function(responseDetails) {
        var r = responseDetails.responseText;
        r = r.replace(/<script/, '<div').replace(/script>/, 'div>');
        var data = $(r);
        $('.ls-articoloTesto').replaceWith(data.find('.ls-articoloTesto'));
    });

    /* Fix some ugly styles on mobile */
    $("head").append("<style>html.mobile .ls-colonnaP1.stick { display: none; } html.mobile .ls-colonnaP2 { width: 100% !important; padding-left: 1rem; padding-right: 1rem; } html.mobile .insertoTopNews { margin: .5em 0 !important; }</style>");

})();