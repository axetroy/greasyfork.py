// ==UserScript==
// @name         Hide Review Accuracy
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Hide the review accuracy in the top right during review sessions
// @author       RysingDragon
// @match        https://www.wanikani.com/review/session
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var thumb = document.getElementsByClassName("icon-thumbs-up")[0];
    thumb.parentNode.removeChild(thumb);

    var accuracy = document.getElementById("correct-rate");
    accuracy.parentNode.removeChild(accuracy);
})();