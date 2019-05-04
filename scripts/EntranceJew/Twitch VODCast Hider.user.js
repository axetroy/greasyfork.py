// ==UserScript==
// @name         Twitch VODCast Hider
// @namespace    http://ejew.in/
// @version      0.1
// @description  get that weak ass shit out of here
// @author       EntranceJew
// @match        https://www.twitch.tv/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        $('.is-watch-party').closest('.ember-view').hide();
    }, 1000);
})();