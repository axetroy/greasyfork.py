// ==UserScript==
// @name         Youtrack + Vimium fixes
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  modify youtrack behavior
// @author       You
// @match        https://*.myjetbrains.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("blur", document.activeElement);
        document.activeElement.blur();
})();