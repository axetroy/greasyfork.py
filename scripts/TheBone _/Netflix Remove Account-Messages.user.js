// ==UserScript==
// @name         Netflix Remove Account-Messages
// @namespace    none
// @version      0.1
// @description  Removes messages like: 'Your email-address is not valid', etc...
// @author       TheBone_
// @match        *://*.netflix.com/*
// @grant        none
// @icon         http://www.netflix.com/favicon.ico
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    $(".uma").remove();
})();