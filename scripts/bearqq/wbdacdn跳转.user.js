// ==UserScript==
// @name 		    wbdacdn跳转
// @description		跳转 http://weibo.wbdacdn.com/url/t/abcd/ 到http://t.cn/abcd
// @author		    bearqq
// @namespace   	
// @version		    1.2
// @date		    2017.7.14
// @modified		2017.7.14
// @supportURL      https://greasyfork.org/scripts/31432/
// 
// @include     	http://weibo.wbdacdn.com/*
// 
// @encoding		utf-8
// @run-at          document-start
// ==/UserScript==

urls=location.href.split('/').slice(4);
if (urls[0]=="t") {
  location.href = "http://t.cn/"+urls[1];
}
