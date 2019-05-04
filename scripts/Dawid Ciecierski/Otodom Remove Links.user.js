// ==UserScript==
// @name         Otodom Remove Links
// @namespace    http://www.studiopomyslow.com
// @version      20170425
// @description  Umożliwia łatwe skopiowanie nazwy miejscowości.
// @author       Dawid Ciecierski
// @match        https://www.otodom.pl/oferta/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.address-links > a').replaceWith(function() { return $(this).text(); });
})();