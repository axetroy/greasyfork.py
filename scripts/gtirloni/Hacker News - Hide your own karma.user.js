// ==UserScript==
// @name         Hacker News - Hide your own karma
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Hide your own karma in the top right corner (to avoid karma obsession)
// @author       Giovanni Tirloni
// @match        https://news.ycombinator.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByClassName("pagetop")[1].childNodes[2].textContent = " | ";
})();