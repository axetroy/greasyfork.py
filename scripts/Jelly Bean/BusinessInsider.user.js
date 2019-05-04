// ==UserScript==
// @name         BusinessInsider
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Block ads with adblockerplus
// @author       Ali Mamedov
// @match        http://www.businessinsider.com/*
// @grant        none
// @require https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==


$(document).ready(function() {
    $( "body" ).removeClass( "bipf tp-modal-open" );
    $( "body" ).removeClass( "tp-modal-open" );
});