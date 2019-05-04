// ==UserScript==
// @name         Youtube popup video titles
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Popup video titles
// @author       Burlaka.net
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @require      https://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
	function popup_video_title() {
		$('.ytp-ce-covering-overlay .ytp-ce-video-title').each(function() {
			$(this).parent().parent().attr('title', $(this).text())
		});
	}
	setTimeout(popup_video_title, 3000);
})();