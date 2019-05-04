// ==UserScript==
// @name         Songsterr Print-Enabler
// @namespace    https://greasyfork.org/de/scripts/369383-songsterr-print-enabler
// @version      0.4
// @description  Enable printing at songsterr.com
// @author       Guitar Hero
// @grant        none
// @include *songsterr.com*
// @include songsterr.com*
// @include *songsterr.com
// @include songsterr.com
// @include www.songsterr.com*
// @include http://songsterr.com/*
// @include http://*.songsterr.com/*

// ==/UserScript==

(function() {
    'use strict';

    // Remove nag screens
    document.querySelectorAll('section section:not(#tablature)').forEach(function(item){item.style.display='none';});
    document.querySelectorAll('header a[target="_blank"]').forEach(function(item){item.style.display='none';});

    // Show tabs
    // (except first and last svg element)
    var svgElements = document.querySelectorAll('#root #tablature svg');
    for (var i=1; i < svgElements.length-1 ; i++) {
        svgElements[i].style.display = "block";
    }
})();
