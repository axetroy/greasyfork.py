// ==UserScript==
// @name         游侠客摄影网一键复制标题
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.1.0
// @description  添加复制标题按钮
// @author       pana
// @include      http*://www.youxiake.net/album/*
// @grant        none
// @require      https://greasyfork.org/scripts/376044-copytitle-js/code/copyTitlejs.js?version=657830
// ==/UserScript==

(function() {
	'use strict';
	const textColor = {
		afterCopy: '#FF9A00'
	};
	let asideProduct = $("div.aside-product");
	asideProduct.on({
		'click': function() {
			let divTitle = $("div.title");
			copyTitle.copyString(divTitle.text(), divTitle, 'color', textColor.afterCopy)
		},
		'mouseenter': function() {
			$(this).css({
				'cursor': 'pointer'
			})
		}
	}, "div.title");
	asideProduct.one('mouseenter', "div.title", function() {
		$(this).attr('title', copyTitle.title)
	})
})();