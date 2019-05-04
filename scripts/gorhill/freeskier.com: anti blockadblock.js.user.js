// ==UserScript==
// @name         freeskier.com: anti blockadblock.js
// @namespace    https://github.com/gorhill/uBlock
// @version      0.1
// @description  This will un-hide the video widgets, which are hidden by default
// @author       gorhill
// @match        http://freeskier.com/videos/*
// @grant        none
// ==/UserScript==

;(function() {
    'use strict';

    var el = document.getElementById("adb-not-enabled");
    if ( el !== null ) {
        el.style.removeProperty("display");
    }
    el = document.getElementById("videoContainer");
    if ( el !== null ) {
        el.style.removeProperty("display");
    }
})();