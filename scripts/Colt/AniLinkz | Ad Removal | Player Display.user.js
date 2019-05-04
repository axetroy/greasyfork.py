// ==UserScript==
// @name         AniLinkz | Ad Removal | Player Display
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove the ad container and display the player on AniLinkz
// @author       https://twitter.com/BitOBytes
// @match        *://*.anilinkz.tv/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
var player, adContainer, fails = 0, limit = 5;

// Your code here...
var run = function () {
    player = document.getElementById('player');
    adContainer = document.getElementById('show_ads_player');
    
    if (player) {
        if (adContainer)
            adContainer.style.display = "none";
        
        player.style.display = "block";
        return;
    }
    
    if (fails >= limit)
        return;
    
    fails++;
    setTimeout(run, 800);
};

setTimeout(run, 800);