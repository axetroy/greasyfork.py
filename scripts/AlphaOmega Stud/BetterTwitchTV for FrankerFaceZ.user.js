// ==UserScript==
// @name         BetterTwitchTV for FrankerFaceZ
// @namespace    http://deepbot.xyz/
// @version      2.1.2
// @description  Better Twitch TV emotes for FrankerFaceZ
// @author       iiNinetales
// @match        *://*.twitch.tv/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

function inject() {
    var s = document.createElement('script');
    s.src = "https://deepbot.xyz/inject.js";
    s.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head || document.documentElement).appendChild(s);
}

inject();