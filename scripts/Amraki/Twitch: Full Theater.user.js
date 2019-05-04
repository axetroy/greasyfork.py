// ==UserScript==
// @name         Twitch: Full Theater
// @namespace    http://tampermonkey.net/
// @version      2017.12.13
// @description  Hides/Resizes elements preventing video from displaying in the full window while using Theater Mode
// @author       Amraki
// @match        https://www.twitch.tv/*
// @match        http://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	(document.head || document.documentElement).insertAdjacentHTML('beforeend',

		'<style>' +
			    '.video-player__container { bottom: 0rem!important; }' +
        '</style>'
     );
     
})();