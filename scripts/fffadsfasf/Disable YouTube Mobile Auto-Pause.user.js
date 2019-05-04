// ==UserScript==
// @name         Disable YouTube Mobile Auto-Pause
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://m.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onblur = function() { document.getElementsByClassName('html5-video-container')[0].click(); }
})();