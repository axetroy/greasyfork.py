// ==UserScript==
// @name         修改Issues页面宽度
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*/*/issues/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var style = document.createElement('style');
    style.innerHTML = '.container{ min-width: 90%} .discussion-timeline { min-width: calc(100% - 220px)}';
    document.head.appendChild(style);
    // Your code here...
})();