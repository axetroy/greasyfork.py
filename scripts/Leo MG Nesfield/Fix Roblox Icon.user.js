// ==UserScript==
// @name         Fix Roblox Icon
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Use a red favicon on Roblox.com
// @author       theLMGN
// @match        https://www.roblox.com/*
// @grant        none
// @licence      GPL-3.0-only
// ==/UserScript==

(function() {
    'use strict';

    document.querySelector("head > link[rel=icon]").href = "https://roblox.com/favicon.ico"
})();