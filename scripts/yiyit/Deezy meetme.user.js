// ==UserScript==
// @name         Deezy meetme
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://tr.m.meetme.com/mobile/match/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", function(e) {
window.setInterval(function() {
 MobileMYB.matchQueueActionYes(true);
}, 1000);
}, false);


})();