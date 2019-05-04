// ==UserScript==
// @name         原创馆一键复制标题
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.1.0
// @description  添加复制标题按钮
// @author       pana
// @include      http*://ycg.qq.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://greasyfork.org/scripts/376044-copytitle-js/code/copyTitlejs.js?version=657830
// ==/UserScript==

(function() {
	'use strict';
	const ycgValue = {
		backgroundColor: {
			mouseleave: '#333',
			mouseenter: '#777'
		},
		textColor: {
			beforeCopy: '#fff',
			afterCopy: '#afafaf'
		}
	};

	function copyPage() {
		if ($(copyTitle.jQuerySelector).length === 0) {
			$("div#pc-detail div.operate").after(copyTitle.copyBtn);
			$(copyTitle.jQuerySelector).text(copyTitle.title).css({
				'color': ycgValue.textColor.beforeCopy,
				'background-color': ycgValue.backgroundColor.mouseleave,
				'width': '120px',
				'height': '40px',
				'font-size': '16px',
				'text-align': 'center',
				'line-height': '40px',
				'border-radius': '20px',
				'display': 'block',
				'margin-top': '15px'
			}).hover(function() {
				$(this).css({
					'background-color': ycgValue.backgroundColor.mouseenter
				})
			}, function() {
				$(this).css({
					'background-color': ycgValue.backgroundColor.mouseleave
				})
			}).on('click', function() {
				let copyText = $("div#pc-detail div.works-title").text();
				copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', ycgValue.textColor.afterCopy)
			})
		}
	}
	copyPage();
	setInterval(copyPage, 500)
})();