// ==UserScript==
// @name         Spoiler Clicker
// @namespace    http://reddit.com/u/TIFUByRedditting
// @version      4.20
// @description  Clicks spoiler buttons automatically on reddit
// @author       /u/TIFUByRedditting
// @match        *://*.reddit.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function() {
 document.querySelector('.expando-gate__show-once').click();
    }, 15);
})();