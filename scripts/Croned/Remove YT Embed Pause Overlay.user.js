// ==UserScript==
// @name         Remove YT Embed Pause Overlay
// @namespace    https://greasyfork.org/en/users/9694-croned
// @version      1.0
// @description  Removes the pause overlay from embedded YouTube videos
// @author       Croned
// @match        https://www.youtube.com/embed/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByClassName("ytp-pause-overlay ytp-scroll-min")[0].remove();
})();