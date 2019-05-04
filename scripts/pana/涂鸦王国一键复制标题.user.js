// ==UserScript==
// @name         涂鸦王国一键复制标题
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.2.0
// @description  一键复制标题
// @author       pana
// @include      http*://www.gracg.com/works/view/*
// @grant        none
// @require      https://greasyfork.org/scripts/376044-copytitle-js/code/copyTitlejs.js?version=657830
// ==/UserScript==

(function() {
	'use strict';
	const textColor = {
		afterCopy: '#20c997'
	};
	$("a.feedback").eq(1).after(copyTitle.copyBtn);
	$(copyTitle.jQuerySelector).text(copyTitle.title).css({
		'display': 'block',
		'background': '#fbfbfb',
		'border': '1px #e7e7e7 solid',
		'text-align': 'center',
		'opacity': '.9',
		'margin-top': '4px',
		'padding': '2px',
		'font-size': '12px'
	}).on('click', function() {
		let copyText = $("div.news1 div.tit").text();
		copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', textColor.afterCopy)
	})
})();