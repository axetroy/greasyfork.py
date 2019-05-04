// ==UserScript==
// @name         Better Alis
// @description  One of best extensions to alis.io (Click on logo to open panel) Adding lot of features. Everything is toggleable.
// @namespace    http://tampermonkey.net/
// @version      12
// @author       Zimek
// @match        *://*.alis.io/*
// @icon         https://zimek.tk/BetterAlis/res/logo.png
// @run-at       document-end
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

$("body").append(`<script src="https://zimek.tk/BetterAlis/BetterAlis.js?nocache=${Date.now()}"></script>`);
