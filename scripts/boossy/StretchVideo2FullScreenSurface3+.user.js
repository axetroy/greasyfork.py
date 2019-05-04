// ==UserScript==
// @name StretchVideo2FullScreenSurface3+
// @namespace http://tampermonkey.net/
// @version 0.1
// @description Stretch (YouTube & VRTNU) videos to fill Surface 3+ displays (3:2 aspect ratio, distorted)
// @author Stijn Bousard
// @match https://www.youtube.com/*
// @match https://www.vrt.be/vrtnu/*
// @grant none
// ==/UserScript==
function addGlobalStyle(css) {
 var head, style;
 head = document.getElementsByTagName('head')[0];
 if (!head) { return; }
 style = document.createElement('style');
 style.type = 'text/css';
 style.innerHTML = css;
 head.appendChild(style);
}
// YouTube (stretch 3:2):
addGlobalStyle('.html5-video-player .video-click-tracking, .html5-video-player .video-stream { display: block; width: 100%; height: 100%; position: absolute; transform: scaleY(1.185) !important; } ');
// YouTube (full height & width with overflow, but centered):
addGlobalStyle('.html5-video-player .video-click-tracking, .html5-video-player .video-stream { display: block; width: 100%; height: 100%; position: absolute; transform: scale(1.065, 1.185) !important; } ');
// VRT NU (stretch 3:2):
// addGlobalStyle('.vuplay-container video { display: block; width: 100%; height: 100%; top: 50%; left: 50%; -webkit-transform: translate3d(0px, 0px, 0px); transform: scaleY(1.185) !important; } ');
// VRT NU (full height & width with overflow, but centered):
addGlobalStyle('.vuplay-container video { display: block; width: 100%; height: 100%; top: 50%; left: 50%; -webkit-transform: translate3d(0px, 0px, 0px); transform: scale(1.065, 1.185) !important; } ');