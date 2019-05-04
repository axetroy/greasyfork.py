// ==UserScript==
// @name         guitarbackingtrack downloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.guitarbackingtrack.com/*
// @require      https://code.jquery.com/jquery-latest.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(".b-player--header--song").append($("<br/>"));
    $(".b-player--header--song").append($("<a />").attr("href", $("audio.js-audio").attr("src")).text("Download").css("font-size", "0.7em"));

})();