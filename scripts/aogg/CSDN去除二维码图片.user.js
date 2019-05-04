// ==UserScript==
// @name CSDN去除二维码图片
// @description 去除二维码图片
// @include     http://blog.csdn.net/*
// @grant       ao
// @version 0.0.1.20160102053431
// @namespace https://greasyfork.org/users/25818
// ==/UserScript==



//$(function(){
  	// css实现
	addGlobalStyle('#com-appcode-float-block{display:none!important;}');
	
	
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
//});

