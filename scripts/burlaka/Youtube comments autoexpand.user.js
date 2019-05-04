// ==UserScript==
// @name         Youtube comments autoexpand
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Youtube expand long comments on mouseover
// @author       Burlaka.net
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @require      https://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	$(document).on('mouseover', '.comment-renderer-text-content', function(e) {
		var $this = $(this);
		$this.addClass('expanded');
		$this.next('.comment-text-toggle').find('.read-more').addClass('hid');
		$this.next('.comment-text-toggle').find('.show-less').removeClass('hid').css('display','inline');
	});
	$(document).on('mouseover', '#watch-description', function(e) {
		var $this = $(this);
		$this.parent().removeClass('yt-uix-expander-collapsed');
	});
})();