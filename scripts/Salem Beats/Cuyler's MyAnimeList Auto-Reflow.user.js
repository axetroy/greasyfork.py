// ==UserScript==
// @name         Cuyler's MyAnimeList Auto-Reflow
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Get rid of all the "please stop blocking our ads senpai" ads.
// @author       You
// @include      https://myanimelist.net/*
// @require      https://code.jquery.com/jquery-3.2.1.slim.min.js
// @grant        none
// @icon         http://ez-link.us/sb-png
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    $(".widget.right_top_ad.right").remove();
    $(".widget.left_bottom_ad.left").remove();
    $(".banner-header-anime-straming").remove();
    $("#footer-block").remove();
    $(".mauto.clearfix.pt24").remove();
    $(".side-ad.side-ad--l").remove();
    $(".side-ad.side-ad--r").remove();
    $("._unit").remove();
})();