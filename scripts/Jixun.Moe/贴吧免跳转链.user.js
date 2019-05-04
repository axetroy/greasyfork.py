// ==UserScript==
// @name         贴吧免跳转链
// @namespace    http://jixun.org/
// @version      1.0.1.4
// @description  修正跳转链为直接点击的链接 owo, 103 包含该功能。
// 搭配 [178] 食用效果更佳
// @include      http://tieba.baidu.com/*
// @copyright    2013+, Jixun66 / Jixun67 / Jixun.Moe
// @require      https://greasyfork.org/scripts/216/code/helper.js?v=1
// @run-at       document-start
// ==/UserScript==

document.addEventListener ('DOMContentLoaded', function () {
	console.log ('贴吧免跳转链: 启动');

	var parseLinkUrl = function (n, u) {
		if (n.parentNode.className.indexOf('wrapper') !== -1) {
			GM_xmlhttpRequest ({
				method: 'HEAD',
				url: n.href,
				headers: {
					// 去你的百度
					Referer: 'http://tieba.baidu.com/p/123456789'
				},
				onload: function (response) {
					if (response.finalUrl.indexOf('http') == 0) n.href = response.finalUrl;
				}
			});

			return false;
		}

		// 删掉开头结尾的空格
		var ret = u.replace(/(^\s*|\s*$)/g, '');

		// @ 链接防出错. 虽然现阶段不会但是难保以后会被查到
		if (u.indexOf('@') == 0)
			return false;

		console.log ('修正链接: %s', u);
		// 检查是否带 http 协议头 (因为度娘能识别 www.example.com 这样的地址)
		// 如果不添加会跳到 => 当前.域名/www.example.com
		if (ret.indexOf ('http') != 0)
			return 'http://' + ret;
		return ret;
	};
	
	function doFixLink (f) {
		// 枚举链接
		for (var i=0,
			 allLink = f.querySelectorAll ('a[href*="jump.bdimg.com/safecheck"]'); 
				i < allLink.length; i++)

			// 替换成内容链接
			allLink[i].href = parseLinkUrl(allLink[i], allLink[i].textContent || allLink[i].innerText) || allLink[i].href;
	}
	
	doFixLink (document);
	USO.fl.reg (doFixLink);
	console.log ('贴吧免跳转链: 结束');
}, false);