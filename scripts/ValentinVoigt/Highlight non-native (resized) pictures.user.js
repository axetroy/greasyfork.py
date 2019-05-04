// ==UserScript==
// @name         Highlight non-native (resized) pictures
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Draws an outline around img elements, which have been resized by the browser
// @author       Valentin Voigt
// @grant        none
// @include      *
// ==/UserScript==

function checkImageSize(event) {
    for (let img of document.getElementsByTagName('img')) {
        if (img.naturalHeight == img.height && img.naturalWidth == img.width) {
            img.style.outline = '10px solid green';
        } else {
            img.style.outline = '10px solid red';
        }
    }
}

function showForceReload(event) {
    for (let img of document.getElementsByTagName('img')) {
        img.style.outline = '10px solid orange';
    }
}

(function() {
    'use strict';
    window.onresize = showForceReload;
    checkImageSize();
})();