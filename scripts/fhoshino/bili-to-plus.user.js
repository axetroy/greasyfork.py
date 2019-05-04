// ==UserScript==
// @name        bili-to-plus
// @namespace   123
// @include     http://www.bilibili.com/video/*
// @version     1
// @description bilibili to biliplus
// @grant       none
// @@run-at     document-start
// ==/UserScript==

 
location.replace(
	location.href.replace(/\:\/\/www\.bilibili\.com\/video/, '://www.biliplus.com/video')
)