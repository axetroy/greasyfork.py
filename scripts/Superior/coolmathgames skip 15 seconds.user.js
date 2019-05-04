// ==UserScript==
// @name         coolmathgames skip 15 seconds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skips the 15 seconds wait in coolmathgames.com
// @author       You
// @match        *://*.coolmathgames.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    javascript:removePrerollAndDisplayGame();
})();