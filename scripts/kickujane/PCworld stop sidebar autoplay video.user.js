// ==UserScript==
// @name       PCworld stop sidebar autoplay video
// @namespace  https://infovikol.ch/
// @version    0.1
// @description  fuck PCworld
// @match      http*://*.pcworld.com/*
// @grant   none
// ==/UserScript==

function stop() {  
    this.pause();  
    this.currentTime=0;
}

document.getElementById("bcplayer-rightrail_html5_api").addEventListener("timeupdate", stop, false);