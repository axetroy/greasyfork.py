// ==UserScript==
// @name         Remove MyBroadband partner content
// @description  Removes all "partner content" from mybroadband
// @namespace    http://tampermonkey.net/
// @version      0.5
// @author       Spooky User
// @match        *://mybroadband.co.za/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    $('.feed_article').each( function() {
        if($(this).find('.presented-title').length){
            $(this).remove();
        }
    });
})();