// ==UserScript==
// @name         Youtube - Hide Volume Control
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hides Youtube videos' volume control.
// @author       Gökhan Sarı
// @match        https://www.youtube.com/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
        $("button.ytp-mute-button").hide();
    });
})();