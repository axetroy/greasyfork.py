// ==UserScript==
// @name         Twitter Night Mode
// @namespace    https://juanjosalvador.me
// @version      0.1
// @description  I don't like Twitter's background.
// @author       Juan José Salvador Piedra
// @match        https://*.twitter.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    var dark = "#444";
    // add your custom colors here

    $('body').css("background-color", dark);
    // add your custom elements here
});