// ==UserScript==
// @name         Next and Previous key shortcuts for SoundCloud
// @description  Allows the left and right keyboard arrows to be used to go to the previous and next songs on SoundCloud (without having to click on the next or previous buttons at all).
// @author       Zach Saucier
// @namespace    https://zachsaucier.com/
// @version      1.0
// @match        https://soundcloud.com/*
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('keydown', (event) => {
        switch(event.code) {
            case 'ArrowLeft':
                document.querySelector('.skipControl__previous').click();
                break;
            case 'ArrowRight':
                document.querySelector('.skipControl__next').click();
                break;
        }
    }, false);
})();