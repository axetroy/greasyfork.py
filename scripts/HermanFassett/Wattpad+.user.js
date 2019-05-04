// ==UserScript==
// @name         Wattpad+
// @namespace    wattpad.com
// @version      0.1
// @description  Adds useful things to Wattpad
// @author       Herman Fassett
// @include      https://wattpad.com/*
// @include      https://www.wattpad.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var data, part, reading = false;
    for (var i in window.prefetched) {
        if (i.match("part")) {
            reading = true;
            data = window.prefetched[i].data;
            part = i;
            // Display word count
            var stats = document.getElementsByClassName("story-stats")[0];
            var words = document.createElement("span");
            var inner = document.createElement("span");
            var text = document.createElement("p");
            text.innerText = data.wordCount + " words";
            inner.className = "fa fa-view fa-wp-grey";
            words.appendChild(inner);
            words.appendChild(text);
            stats.appendChild(words);
        }
    }
    document.onkeydown = function(e) {
        if (reading) {
            // Allow part navigation by arrow keys
            if (e.keyCode == 39) { // Right - Next part
                window.location = data.nextPart.url;
            }
            else if (e.keyCode == 37) { // Left
                var parts = data.group.parts;
                for (var i = 0; i < parts.length; i++) {
                    if (parts[i].active && i > 0) {
                        window.location = parts[i-1].url;
                    }
                }
            }
        }
    };
})();
