// ==UserScript==
// @name         Picarto Font Fix
// @namespace    https://floof.me/
// @version      1.0
// @description  Changes Picarto's font to Open Sans
// @author       Yoshitura
// @match        https://picarto.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //ehh
    var headElement = document.head;
    var bodyElement = document.body;
    var style_override = document.createElement('style');
    style_override.setAttribute('type','text/css');
    style_override.innerHTML = "body {font-family: 'Open Sans', sans-serif !important;}";
    var google_font = document.createElement('link');
    google_font.setAttribute('href','https://fonts.googleapis.com/css?family=Open+Sans');
    google_font.setAttribute('rel','stylesheet');
    headElement.appendChild(google_font);
    bodyElement.appendChild(style_override);
})();