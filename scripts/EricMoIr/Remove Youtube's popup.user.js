// ==UserScript==
// @name         Remove Youtube's popup
// @version      0.2
// @description  Script to remove the popup that randomly shows when watching videos in their site
// @author       Vingyard
// @include      /youtube\.com\/watch/
// @grant        none
// @namespace https://greasyfork.org/users/150647
// ==/UserScript==

(function() {
    'use strict';
    let interval = setInterval(() => {
        const elements = document.getElementsByClassName("style-scope yt-button-renderer style-blue-text size-default")
        if (elements.length > 2) {
            elements[elements.length-1].click();
        }
    }, 1000);
})();