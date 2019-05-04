// ==UserScript==
// @name         Il Gazzettino Full Text Articles
// @namespace    https://andrealazzarotto.com/
// @version      1.1.3
// @description  Fetch the full text of Il Gazzettino articles from the AMP version
// @author       Andrea Lazzarotto
// @match        https://ilgazzettino.it/*
// @match        https://*.ilgazzettino.it/*
// @match        http://ilgazzettino.it/*
// @match        http://*.ilgazzettino.it/*
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

    var paywalled = !!$(":contains('CONTINUA A LEGGERE'), #paywall").length;

    if (paywalled) {
        fetch({
            method: 'GET',
            url: $("link[rel=amphtml]").attr('href'),
        }).then(function(responseDetails) {
            var r = responseDetails.responseText;
            r = r.replace(/<script/gi, '<div').replace(/script>/gi, 'div>');
            var data = $(r);
            data.find('.url-button').remove();
            var signature = $('.corpo_articolo .articolo-firma');
            var content = data.find('[itemprop=articleBody]');
            content.find('br').replaceWith('<p>');
            content.find('p').css('margin', '.5rem 0');
            content.find('.end_preview').remove();
            content.prepend(signature);
            $('.corpo_articolo').replaceWith(content);
            $('footer.home').css('margin-top', '2rem');
        });
    }

    document.cookie="meter=;path=/";
    $(document).ready(function() {
        $("body > div:contains('AdBlock attivo'), .autopromo").remove();
    });

})();