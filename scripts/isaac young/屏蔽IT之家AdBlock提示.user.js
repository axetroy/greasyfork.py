// ==UserScript==
// @name         屏蔽IT之家AdBlock提示
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  隐藏ADBlock banner
// @author       isaac young
// @match        https://*.ithome.com/*
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';
    var s = document.createElement('style');
    s.innerHTML = '.AdblockBanner {display: none!important;}';
    document.querySelector('head').appendChild(s);
    // Your code here...
})();