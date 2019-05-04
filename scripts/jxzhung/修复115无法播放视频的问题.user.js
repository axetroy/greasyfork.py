// ==UserScript==
// @namespace         http://www.egouz.com/topics/11503.html
// @name              115VideoFix
// @name:en           115VideoFix
// @name:zh           修复115无法播放
// @name:zh-CN        修复115无法播放视频的问题
// @description       修复115无法播放
// @description:en    115 net disk bugfix
// @description:zh    修复115无法播放zh
// @description:zh-CN 修复115无法播放视频的问题cn
// @include           *://115.com/*
// @homepageURL       https://tiansh.github.io/us-else/zhihu_visitor/
// @supportURL        https://github.com/tiansh/us-else/issues/
// @version           3.4
// @grant             GM_addStyle
// @grant             GM_xmlhttpRequest
// @connect-src       115.com
// ==/UserScript==

$("a[field='file_name']").click(function(){
	alert("111");
});
