// ==UserScript==
// @name         YouTube Debug Button Enabler
// @namespace    http://tampermonkey.net/
// @version      1337
// @description  Enables the hidden DEBUG button on YouTube.
// @author       Ryan Kovatch
// @match           http://www.youtube.com/*
// @match           https://www.youtube.com/*
// @match           http://youtube.com/*
// @match           https://youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var elmExtra = document.getElementById('extra-buttons');
    elmExtra.innerHTML = '<ytd-debug-menu class="style-scope ytd-app" enable-upgrade></ytd-debug-menu>';
})();