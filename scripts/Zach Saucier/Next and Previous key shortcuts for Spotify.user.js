// ==UserScript==
// @name         Next and Previous key shortcuts for Spotify
// @description  Allows the left and right keyboard arrows to be used to go to the previous and next songs on Spotify.
// @author       Zach Saucier
// @namespace    https://zachsaucier.com/
// @version      1.1
// @match        https://open.spotify.com/*
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('keydown', (event) => {
        switch(event.code) {
            case 'ArrowLeft':
                document.querySelector('.spoticon-skip-back-16').click();
                break;
            case 'ArrowRight':
                document.querySelector('.spoticon-skip-forward-16').click();
                break;
        }
    }, false);
})();