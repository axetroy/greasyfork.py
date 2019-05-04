// ==UserScript==
// @name         Clicks on all 'Show more' links in silverbucket when you press Alt+M.
// @namespace    http://tampermonkey.net/
// @version      0.2.3
// @description  A greasemonkey or tampermonkey script that clicks all span elements that has their 'translate' attribute set to 'Show more'. Tested on chrome 72.0.3626.119.
// @author       jous
// @match        https://*.agbucket.com/m/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        // Check if Alt-M is pressed
        if (e.keyCode == 77 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
            press_every_show_more_link();
        }
    }, false);

})();

function press_every_show_more_link() {
    let count = 0;
    let tags = document.querySelectorAll('span[translate="Show more"]');

    Array.prototype.forEach.call(tags, function(elem) {
      elem.click();
      count++;
    });

    console.log("Keyboard shortcut opened " + count + " links.");
}