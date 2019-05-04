// ==UserScript==
// @name         Barter.vg, Hidden ignored and zero tradables
// @description  try to take over the world!
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://barter.vg/i/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll("span[title='ignored']").forEach(function (el) {
        el.style.display = "none";
        el.parentElement.style.display = "none";
    });
    document.querySelectorAll("abbr[title='no tradables']").forEach(function (el) {
        el.parentElement.parentElement.style.display = "none";
    });

    // Your code here...
})();