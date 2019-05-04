// ==UserScript==
// @name auto adjust youtube video speed
// @namespace Violentmonkey Scripts
// @description set youtube video speed to 1.5x(you can set your own speed) automatically.
// @match *://*.youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js

// @grant    GM_addStyle
// @version 0.0.1.20180625212538
// ==/UserScript==

//
//!!!important!!!
//you have to manually add "// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js" to the script.

waitForKeyElements ("video", function() {
    'use strict';

    // set your desired play speed here
    var rate = 1.5;
    document.querySelector('video').playbackRate = rate;
});