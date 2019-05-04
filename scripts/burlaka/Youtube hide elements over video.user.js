// ==UserScript==
// @name         Youtube hide elements over video
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Add button to hide all elements over video
// @author       Burlaka.net
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('#upload-btn').parent().prepend('<a onclick="$(\'.ytp-ce-element\').toggle();return false;" style="display:inline-block;padding:5px 12px;border:1px solid #ccc;text-decoration:none;">Hide</a>');
    $('#yt-masthead-creation-menu').parent().prepend('<a onclick="$(\'.ytp-ce-element\').toggle();return false;" style="display:inline-block;padding:5px 12px;border:1px solid #ccc;text-decoration:none;">Hide</a>');

})();