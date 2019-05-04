// ==UserScript==
// @name         Geocaching + ProjectGC + Style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Some small design changes when using ProjectGC with Geocaching
// @author       Martin Jahn
// @match        https://www.geocaching.com/geocache/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('head').append('<link rel="stylesheet" type="text/css" href="https://caching.martinjahn.org/projectgc-geocaching-custom.css">');

})();