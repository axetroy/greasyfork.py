// ==UserScript==
// @name         YT - hide streams on watchlist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    jQuery('span.style-scope.ytd-grid-video-renderer:contains(Streamed)').closest('#dismissable').parent().remove();

    setInterval(function() {
        jQuery('span.style-scope.ytd-grid-video-renderer:contains(Streamed)').closest('#dismissable').parent().remove();
    }, 1600);
})();