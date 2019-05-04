// ==UserScript==
// @name 示例代码
// @description 个人示例代码
// @include     aaa
// @require     http://cdn.bootcss.com/jquery/1.11.3/jquery.js
// @grant       ao
// @version 0.0.1.20160102053326
// @namespace https://greasyfork.org/users/25818
// ==/UserScript==

$(function(){
    // 开始
	
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	
	console.log('完成');
	
})





