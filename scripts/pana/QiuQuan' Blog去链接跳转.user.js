// ==UserScript==
// @name         QiuQuan' Blog去链接跳转
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.0.0
// @description  去链接跳转
// @author       pana
// @include      http*://*qiuquan.cc/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	const jumpUrl = 'go.php?url=';
	$('#main a').each(function() {
		if (this.href.indexOf(jumpUrl) !== -1) {
			this.href = this.href.split(jumpUrl)[1]
		}
	})
})();