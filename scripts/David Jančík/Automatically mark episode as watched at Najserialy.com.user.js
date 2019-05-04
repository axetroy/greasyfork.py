// ==UserScript==
// @name         Automatically mark episode as watched at Najserialy.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  It will mark a episode as watched after clicking the advertising close button
// @author       You
// @match        https://najserialy.com/serial/*
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

(function() {
    'use strict';

    $('.rekRPlama .close').click(function() {
        // already marked as watched
        if ($('.actions .viewed.active').length > 0) return;
        $('.actions .viewed').click();
    });
})();