// ==UserScript==
// @name         Alexa Font Fix
// @namespace    com.doktorjones.alexafix
// @version      0.1
// @description  Make the font on the Alexa app site more readable
// @author       Doktor Jones
// @match        http://alexa.amazon.com/*
// @match        http://pitangui.amazon.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var styleSheet = document.styleSheets[document.styleSheets.length - 1];
    styleSheet.insertRule('* { ' +
                          'font-family: Arial, sans-serif !important; ' +
                          'font-weight: bold; ' +
                          '}', styleSheet.cssRules.length);
    // Your code here...
})();