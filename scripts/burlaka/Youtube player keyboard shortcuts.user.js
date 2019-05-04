// ==UserScript==
// @name         Youtube player keyboard shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Shortcuts to control Youtube player
// @author       Burlaka.net
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	var volume;

	$(document).ready(function() {
		$(window).keydown(function(e) {
			var player = $('.video-stream.html5-main-video')[0];
			var player_wrap = $('.html5-video-player');

			if (!player_wrap.is(":focus") && !$('input').is(":focus") && !$('.comment-simplebox-text').is(":focus")) {

				if (e.keyCode == 0 || e.keyCode == 32) { // Space = play/pause
					e.preventDefault();
					if (player.paused == false) {
						player.pause();
					} else {
						player.play();
					}
				}
			}

			if ( (e.ctrlKey || e.metaKey) && e.keyCode == 38 ) { // Ctrl + Up = Volume up
				volume = player.volume + 0.1;
				if (volume > 1) volume = 1;
				player.volume = volume;
			}

			if ( (e.ctrlKey || e.metaKey) && e.keyCode == 40 ) { // Ctrl + Down = Volume down
				volume = player.volume - 0.1;
				if (volume < 0) volume = 0;
				player.volume = volume;
			}
		});
	});
})();