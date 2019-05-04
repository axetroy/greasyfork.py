// ==UserScript==
// @name         Youtube Search Bar Center
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Centers Search bar on youtube
// @author       Shadowreaperpro
// @match        .
// @grant        none
// ==/UserScript==

//Default script for centering the search bar, change "center" to a different align if you want the bar somewhere else.

(function() {
    'use strict';

    document.getElementById("yt-masthead-content").setAttribute("align", "center");
})();


// Delayed version to wait for page loading if the current script does not work.

//window.addEventListener('load', function() {
//        'use strict';

//    document.getElementById("yt-masthead-content").setAttribute("align", "center");
//}, false);