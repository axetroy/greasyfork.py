// ==UserScript==
// @name            PT站自动感谢
// @description     浏览PT站资源详情页面时使用 AJAX 方式在后台自动感谢发布者。
// @namespace       https://greasyfork.org/zh-CN/scripts/4736-pt%E7%AB%99%E8%87%AA%E5%8A%A8%E6%84%9F%E8%B0%A2
// @author          ※云※
// @version         2017.12.8
// @include        *://*details.php*
// @include        *://totheglory.im/t/* 
// @icon           http://thumbnails109.imagebam.com/35138/602509351372863.jpg
// ==/UserScript==

(function() {

	function $(css, contextNode) {
		return (contextNode || document).querySelector(css);
	}

	function Thanks() {
		var url = location.href;
		var btn = '';

		if (url.indexOf('totheglory') > 0) {
			btn = $('#ajaxthanks');
		}else if (url.indexOf('hdwing') > 0) {
			btn = $('#thanksbutton');
		}else if (url.indexOf('details') > 0) {
			btn = $('#saythanks');
		}
		if (btn != undefined && btn.disabled != true) {
			//alert(url);
			//btn.onclick = undefined;
			btn.click();
		}
	}

	window.addEventListener('load', Thanks(), false);
})();