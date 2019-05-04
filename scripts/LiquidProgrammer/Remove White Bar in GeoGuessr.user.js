// ==UserScript==
// @name         Remove White Bar in GeoGuessr
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes the white bar at the bottom of geoguessr challenges
// @author       LiquidProgrammer
// @match        https://geoguessr.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var target = document.documentElement;
    target.classList.remove ("no-pro");
    target.classList.add ("pro");
})();