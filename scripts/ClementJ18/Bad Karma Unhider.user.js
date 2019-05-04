// ==UserScript==
// @name         Bad Karma Unhider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.moddb.com/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    var bad_karma = document.querySelectorAll('[title="Bad karma"]');
    for(var count = 0; count < bad_karma.length; count++) {
       bad_karma[count].style.display = "inline";
    };
})();
