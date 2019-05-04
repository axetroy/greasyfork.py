// ==UserScript==
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @name         Tarjeta Roja
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.tarjetaroja-tv.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.containerDiv').remove();
    $('.video_ads_overdiv').remove();
    $('body>iframe').remove();
    $('.advertisement').remove();
    // Your code here...
})();