// ==UserScript==
// @name         Hotsplots Hotspot Autologin
// @namespace    hotsplots-login
// @version      0.1
// @match        https://www.hotsplots.de/*
// @description Automatically login to Hotsplots hotspots
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById("checkAGB").checked = true;
    document.getElementsByTagName('form')[0].submit();
})();