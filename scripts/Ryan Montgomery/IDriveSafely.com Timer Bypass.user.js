// ==UserScript==
// @name         IDriveSafely.com Timer Bypass
// @namespace    Timer Bypass
// @version      1.0
// @description  Bypass the timer on IDriveSafely.com
// @author       Ryan Montgomery
// @match        https://www.idrivesafely.com/course/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
var scriptContent = "vTimeReq = 0;"
var script = document.createElement('script')
script.appendChild(document.createTextNode(scriptContent));
document.getElementsByTagName('head')[0].appendChild(script);
})();