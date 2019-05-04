// ==UserScript==
// @name         Youtube viewed
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Set opacity to viewed videos
// @author       Burlaka.net
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('.resume-playback-background').parent().css('opacity', '0.5');
    $('.ytd-thumbnail-overlay-resume-playback-renderer').parent().parent().parent().css('opacity', '0.5');
})();