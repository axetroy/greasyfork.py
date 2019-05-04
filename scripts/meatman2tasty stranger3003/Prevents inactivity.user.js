// ==UserScript==
// @name         Prevents inactivity
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  always acts as in window
// @author       meatman2tasty
// @match        http://karnage.io/*
// @grant        none
// ==/UserScript==


setInterval(function(){ 
    setTimeout(inWindow= true, 2);
}, 10);