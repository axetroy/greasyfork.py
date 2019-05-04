// ==UserScript==
// @name         Video Unhider
// @namespace    https://greasyfork.org/users/154522
// @version      1.0
// @description  Fix the video to be unhidden when ad-blocker deletes the ad that would normally unhide it.
// @author       G-Rex
// @match        http://kissanime.ru/Anime/*
// @match        https://kissanime.ru/Anime/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let video = document.querySelector('.video-js');

    video.style.display = null;
})();