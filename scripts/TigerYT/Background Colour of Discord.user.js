// ==UserScript==
// @name         Background Colour of Discord
// @namespace    Background Colour of Discord
// @version      0.1
// @description  Change colour of background in Discord.
// @author       pxgamer
// @include      https://discordapp.com/channels/*
// @grant        none
// ==/UserScript==

setInterval(function() {
    [].forEach.call(document.getElementsByTagName("*"), e => e.style.backgroundColor = "#00B7EB");
}, 1);
