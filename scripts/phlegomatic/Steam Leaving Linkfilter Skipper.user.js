// ==UserScript==
// @name         Steam Leaving Linkfilter Skipper
// @namespace    https://greasyfork.org/en/scripts/370160-steam-leaving-linkfilter-skipper
// @version      0.0.2
// @description  Skip the nagging message about leaving steam
// @author       Phlegomatic
// @match        https://steamcommunity.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

var Catch = "linkfilter"; // look for this
var currentLocation = window.location.href; // get current URL

if (currentLocation.includes(Catch)) {
    var URL = currentLocation.split("?url=");
    window.location.href = URL[1];
}