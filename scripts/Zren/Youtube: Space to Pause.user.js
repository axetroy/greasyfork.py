// ==UserScript==
// @name            Youtube: Space to Pause
// @description     Bind the spacebar to play/pause the video.
// @author          Chris H (Zren)
// @icon            https://youtube.com/favicon.ico
// @namespace       http://xshade.ca
// @version         1
// @include         http*://*.youtube.com/*
// @include         http*://youtube.com/*
// @include         http*://*.youtu.be/*
// @include         http*://youtu.be/*
// ==/UserScript==

window.addEventListener('keydown', function(e) {
    var playButton = document.querySelector('button.ytp-play-button');
    var isKey = e.keyCode === 32; // Space
    var validTarget = e.target === document.body || e.target === document.querySelector('#player-api');
    if (validTarget && isKey && playButton) {
        e.preventDefault();
        playButton.click();
    }
});
