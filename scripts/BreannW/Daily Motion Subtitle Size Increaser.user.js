
// ==UserScript==
// @name         Daily Motion Subtitle Size Increaser
// @version      1
// @description  Increase the size of subtitles on Dailymotion videos to 80px (size adjustable via code editing). 
// @author       Breann
// @include http://www.dailymotion.com/*
// @namespace https://greasyfork.org/users/30221
// ==/UserScript==

// window.addEventListener('load', function() {
    
(function() {
    'use strict';

var subs = document.getElementsByClassName('dmp_SubtitleView-text');
if (subs.length > 0) {
    subs[0].removeAttribute("style");
    subs[0].style.fontSize = "80px";
}
    return; 
    })();
    
 // }, false);
    
