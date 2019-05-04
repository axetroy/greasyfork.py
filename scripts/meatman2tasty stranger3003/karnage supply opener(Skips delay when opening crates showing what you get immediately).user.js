// ==UserScript==
// @name         karnage supply opener(Skips delay when opening crates showing what you get immediately)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Auto opens crates, skips
// @author       meatman2tasty
// @match        http://karnage.io/*
// @grant        none
// ==/UserScript==

setInterval(function(){ 
    setTimeout(crateSpinner.spinVelocity = 0, 2);
}, 10);

document.addEventListener("keydown", function(a) { // Press '=' for common supply
    if (a.keyCode == 187) {
buySupply(1);
    }
}, false);

document.addEventListener("keydown", function(a) { // Press '=' for common supply
    if (a.keyCode == 189) {
completeCratePurchase(this, 1);
    }
}, false);