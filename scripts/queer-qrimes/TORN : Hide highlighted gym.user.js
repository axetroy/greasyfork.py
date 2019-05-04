// ==UserScript==
// @name        TORN : Hide highlighted gym
// @namespace   queer-qrimes.hide-gym
// @author      queer-qrimes [2118517]
// @description hide the gym when it's highlighted, because you're stacking and don't want to accidentally train!
// @match       https://www.torn.com/*
// @version     1.0
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function() {
        if (document.getElementById("nav-gym").className == "area-desktop___29MUo available___19KAG") document.getElementById("nav-gym").style.display = 'none'
        //if (document.getElementById("nav-mr_&_ms_torn").className == "area-desktop___29MUo attention___t36NL") document.getElementById("nav-mr_&_ms_torn").style.display = 'none'
    }
})();