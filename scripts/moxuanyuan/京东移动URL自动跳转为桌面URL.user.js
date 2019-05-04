// ==UserScript==
// @name         京东移动URL自动跳转为桌面URL
// @namespace    http://mozl.net
// @version      0.91
// @description  在桌面电脑上，打开移动端分享的URL，自动跳转到桌面URL
// @author       Mozl
// @include      http*://item.m.jd.com/product/*.html*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';
	var result;
	if((result = (new RegExp(/\/product\/(\d+)\.html/,'i')).exec(location.pathname)) !== null)
	{
		location.href='https://item.jd.com/'+result[1]+'.html';
	}
})();
