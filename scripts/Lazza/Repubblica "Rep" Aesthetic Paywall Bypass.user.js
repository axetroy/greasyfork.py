// ==UserScript==
// @name         Repubblica "Rep" Aesthetic Paywall Bypass
// @namespace    https://andrealazzarotto.com
// @version      1.2.1
// @description  Unhides the "paywalled" articles on Rep
// @author       Andrea Lazzarotto
// @match        https://rep.repubblica.it/*
// @grant        GM_addStyle
// @require      https://greasyfork.org/scripts/35383-gm-addstyle-polyfill/code/GMaddStyle%20Polyfill.js?version=231590
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* Greasemonkey 4 wrapper */
if (typeof GM !== "undefined" && !!GM.addStyle)
  GM_addStyle = GM.addStyle;

var watcher = function() {
    var pwa = location.href.indexOf("/pwa/") > 0;
    var comments = location.pathname.endsWith("/commenti");
    if (pwa && !comments) {
        location.href = location.href.replace("/pwa/", "/ws/detail/");
    }
};

(function() {
    'use strict';

    GM_addStyle("div.detail-article_body > div:not(.paywall) { display: none !important; } .paywall, body:not(.i-amphtml-subs-grant-yes) [subscriptions-section='content']{ display: block !important; }");
    setInterval(watcher, 1000);
    window.dispatchEvent(new Event('resize'));
})();