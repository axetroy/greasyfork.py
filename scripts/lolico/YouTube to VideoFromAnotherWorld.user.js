// ==UserScript==
// @name         YouTube to VideoFromAnotherWorld
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @match        https://www.youtube.com/channel/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.location.href = window.location.href.replace("https://www.youtube.com/watch?v=", "http://vfaw.mywebcommunity.org/watch.html?v=");
    // Your code here...
})();