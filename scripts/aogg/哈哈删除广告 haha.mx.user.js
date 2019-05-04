// ==UserScript==
// @name 哈哈删除广告 haha.mx
// @description 哈哈删除广告，保留今日查看笑话个数和，哈友排行榜
// @include     http://www.haha.mx/joke/*
// @require     http://cdn.bootcss.com/jquery/1.11.3/jquery.js
// @grant       ao
// @version 1.1
// @namespace https://greasyfork.org/users/25818
// ==/UserScript==

console.clear();
var e = $('.fl.sidebar'),
	v = e.children('div:not(.top-10,.ad-1)');
	
v.hide();
$('[class^="banner-ad-"]').hide();
	
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
	





