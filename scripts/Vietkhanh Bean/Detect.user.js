/* global $ */
// ==UserScript==
// @name         Detect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.ha-lab.com/adDone?adKey=*
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(function() {
        window.location.href = "https://www.ha-lab.com/games/dragon-city";
    }, 500);
})();