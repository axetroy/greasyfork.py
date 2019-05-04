// ==UserScript==
// @name         Protect Eye
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Set Background Color to protect eys.
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function() {
        var elements = document.querySelectorAll('*');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.setProperty('background-color', '#C7EDCC', 'important');
            elements[i].style.setProperty('color', 'black', 'important');
        }    
    };
})();