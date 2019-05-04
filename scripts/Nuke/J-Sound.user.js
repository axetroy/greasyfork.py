// ==UserScript==
// @name         J-Sound
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Adds the 'j' shortcut from lesson and review pages to the vocab pages.
// @author       Nuke
// @match        http*://www.wanikani.com/vocabulary/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 74/*'j'*/) {
        console.log("J-sound");

        // If the search input field has focus do nothing
        var activeElement = document.activeElement;
        if (activeElement instanceof HTMLInputElement)
           return;

        // Else find the button and simulate a click
        var audioButton = document.getElementsByClassName('vocabulary-reading')[0].getElementsByClassName('audio-btn')[0];
        audioButton.click();
    }
}, false);