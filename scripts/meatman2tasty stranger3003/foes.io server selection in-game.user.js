// ==UserScript==
// @name         foes.io server selection in-game
// @namespace    http://foes.io/*
// @version      1.0
// @description  gives option to display server list while in-game, press '=' to show, '-' to hide
// @author       Meatman2tasty
// @match        https://foes.io/*
// @grant        none
// ==/UserScript==

//server selection//
document.addEventListener("keydown", function(a) { // Press 'z' to create account
    if (a.keyCode == 187) {
$("#infoCard").css("display","block")
    }
}, false);


document.addEventListener("keydown", function(a) { // Press 'x' to log out
    if (a.keyCode == 189) {
$("#infoCard").css("display","none")
    }
}, false);