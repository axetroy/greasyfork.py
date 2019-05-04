// ==UserScript==
// @name        PC World disable autoplaying how-to video
// @namespace   linagkar
// @description Disables autoplay for the video in the right sidebar on PC World
// @include     *://www.pcworld.com/*
// @include     *://pcworld.com/*
// @version     1
// @grant       none
// ==/UserScript==

const vid = document.getElementById('bcplayer-rightrail_html5_api');
if (vid !== null) {
	let stopPlaying;
	stopPlaying = () => {
		vid.pause();
		vid.removeEventListener('play', stopPlaying);
	};
	vid.addEventListener('play', stopPlaying);
}
