// ==UserScript==
// @name         Douban login nomore!
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Avoid Douban login popup
// @author       Guard36Script
// @include      https://www.douban.com/
// @match        https://www.douban.com/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';
    Douban.init_show_login = () => {
        if ($.overlay) $.overlay.close();
    };
})();