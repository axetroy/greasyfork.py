// ==UserScript==
// @name         EksiSozluk Fav Counter Disable
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Fav sayaçlarını inline biçimlendirmeyle gizler.
// @author       nejdetckenobi
// @match        https://eksisozluk.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.favorite-count {display: none;}');
})();