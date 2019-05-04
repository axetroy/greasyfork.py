// ==UserScript==
// @name            Youtube: AutoPlay Next Right Away
// @namespace       https://github.com/Zren
// @version         1
// @description     Play next video within 1 second of the end of a video.
// @icon            https://youtube.com/favicon.ico
// @author          Zren
// @include         http*://*.youtube.com/*
// @include         http*://youtube.com/*
// @include         http*://*.youtu.be/*
// @include         http*://youtu.be/*
// ==/UserScript==


setInterval(function() {
    var e = document.querySelector('.ytp-upnext:not([style="display: none;"]) a.ytp-upnext-autoplay-icon');
    if (e) {
        e.click();
    }
}, 1000);
