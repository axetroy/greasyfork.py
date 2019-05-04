// ==UserScript==
// @name         FontShadow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  给字体加上阴影
// @author       kirikiri
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementsByTagName('body')[0].style.textShadow = '0.01em 0.01em 0.01em #999';
    // Your code here...
})();