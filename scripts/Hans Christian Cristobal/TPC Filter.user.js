// ==UserScript==
// @name         TPC Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  script to remove posts of a particular seller who sells fake stuff
// @author       You
// @match        https://tipidpc.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $("li:contains('lineage')").remove();
})();