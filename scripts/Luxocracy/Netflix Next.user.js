// ==UserScript==
// @name         Netflix Next
// @version      0.1.2
// @description  Instantly plays the next episode. This script skips the wait time on auto-play and circumvents the "auto pause" that checks if you're still watching.
// @author       Luxocracy
// @grant        none
// @match        https://www.netflix.com/*
// @namespace https://greasyfork.org/users/30239
// ==/UserScript==
(function() {
    /*jshint multistr: true */
    'use strict';
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes.length > 0 && mutation.addedNodes[0].className && mutation.addedNodes[0].className.toString().match(/player-postplay|postplay-button/)) {
                var playnext = (document.querySelector('.postplay-button')) ? document.querySelector('.postplay-button'):document.querySelector('.player-postplay-still-hover-container');
                setTimeout(function() {
                    playnext.click();
                }, 1500);
            }
        });
    });

    observer.observe(document.querySelector('body'), { childList: true, subtree: true });
})();