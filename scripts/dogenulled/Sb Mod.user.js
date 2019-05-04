// ==UserScript==
// @name         Sb Mod
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  smd
// @author       Doge
// @match        https://www.nulled.to/*
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(function(){ chatView.isMod = true; }, 500);
    setTimeout(function(){ chat.isMod = true; }, 500);
})();