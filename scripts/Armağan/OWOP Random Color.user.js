// ==UserScript==
// @name         OWOP Random Color
// @namespace    *.ourworldofpixels.com/*
// @version      0.2.0
// @description  LSD xd
// @author       Armağan
// @match        *.ourworldofpixels.com/*
// @grant        none
// ==/UserScript==

var interval = window.prompt("interval? (MS)", "50")
OWOP.chat.local("--------------\nRefresh the page to stop Random Colors.\n--------------");

setInterval(function(){

var R = Math.floor((Math.random() * 255) + 1)
var G = Math.floor((Math.random() * 255) + 1)
var B = Math.floor((Math.random() * 255) + 1)

WorldOfPixels.player.selectedColor = [R, G, B]

},interval);