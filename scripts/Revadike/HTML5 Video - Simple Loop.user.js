// ==UserScript==
// @name         HTML5 Video - Simple Loop
// @version      0.2
// @description  Loops every HTML5 pages
// @author       Royalgamer06
// @include      *
// @namespace Royalgamer06
// ==/UserScript==

var domains = ["openload.co"];

for (var i = 0; i < domains.length; i++) {
    if (window.location.href.indexOf(domains[i]) > -1) {
        var videos = document.getElementsByTagName("video");
        for (var j = 0; j < videos.length; j++) {
            videos[j].setAttribute("loop", "");
            console.log("[HTML5 Video - Simple Loop] Added loop attribute to a video.")
        }
    }
}