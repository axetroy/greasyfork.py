// ==UserScript==
// @name        TORN : no clouds
// @namespace   queer-qrimes.no-clouds
// @author      queer-qrimes [2118517]
// @description disable the battery-draining clouds when travelling
// @match       https://www.torn.com/*
// @version     1.0
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function() {
        if (document.getElementById('clouds-1')) document.getElementById('clouds-1').style.display = 'none';
        if (document.getElementById('clouds-2')) document.getElementById('clouds-2').style.display = 'none';
        if (document.getElementById('clouds-3')) document.getElementById('clouds-3').style.display = 'none';
    }
})();