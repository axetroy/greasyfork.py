// ==UserScript==
// @name         Youtube Autoplay Off
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Set YouTube's Autoplay mode off by default
// @author       Eric Mintz
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load',function(){
        var autoplay = document.querySelector('input[id="autoplay-checkbox"]');
        if (autoplay.value == "on"){
            setTimeout(function(){
            document.querySelector('input[id="autoplay-checkbox"]').click();
            },1000);
        }
    });
})();