// ==UserScript==
// @name         Recaptcha clicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Clicks on the button
// @author       giuseppe-dandrea
// @match        http*://www.google.com/recaptcha/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function() { document.getElementsByClassName("recaptcha-checkbox-checkmark")[0].click(); }, 1000);
})();