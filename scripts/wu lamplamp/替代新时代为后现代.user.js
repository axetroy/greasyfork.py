// ==UserScript==
// @name         替代新时代为后现代
// @namespace    http://tampermonkey.net/
// @version      0.1111
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
document.body.innerHTML = document.body.innerHTML.replace(/新时代/g, '后现代');
    // Your code here...
})();