// ==UserScript==
// @name         福利吧去跳转
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.0.0
// @description  去掉链接里的跳转
// @author       pana
// @include      http*://fulibus.net/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	const jumpUrl = 'go.php?url=';
	$('.article-content a').each(function() {
		if (this.href.indexOf(jumpUrl) !== -1) {
			this.href = this.href.split(jumpUrl)[1]
		}
	})
})();