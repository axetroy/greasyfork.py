// ==UserScript==
// @name         Twitch: Compact Chat
// @namespace    http://tampermonkey.net/
// @version      2019.03.09
// @description  Larger video in theater mode with smaller chat and emote zoom on hover
// @author       cmcooper123
// @match        https://www.twitch.tv/*
// @match        http://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
	(document.head || document.documentElement).insertAdjacentHTML('beforeend',
		'<style>' +
			'.channel-root__right-column { width: 26rem!important; }' +
			'.persistent-player--theatre { width: calc(100% - 26rem)!important; }' +
			'.chat-line__message, .chat-line__moderation, .chat-line__status { padding: .3rem 0!important; }' +
			'.rooms-header { height: unset!important; }' +
			'.user-notice-line { padding-left: 0.1rem!important; }' +
			'.chat-input.tw-pd-b-2.tw-pd-x-2 { padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 0 !important; }' +
			'.tw-textarea { margin-bottom: -1rem!important; }' +
			'.chat-input .tw-textarea--no-resize { max-height: 50px!important; }' +
			'.chat-line__message--emote:hover { transform: scale(2)!important; }' +
			'.simplebar-track { display: none!important; }' +
		'</style>'
	);
})();