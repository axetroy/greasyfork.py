// ==UserScript==
// @name         BiliPlus
// @namespace    https://www.biliplus.com/
// @version      1.02
// @description  哔哩哔哩“啊叻？视频不见了？”自动跳转
// @author       yggdra
// @match        http*://www.bilibili.com/video/av*
// @run-at       document-start
// @grant        none
// ==/UserScript==
document.addEventListener('DOMContentLoaded', function() {
	let msg = document.querySelector('.error-container');
	if (!msg) return;
	location.replace(
	location.href.replace(/\:\/\/www\.bilibili\.com\/video/, '://www.biliplus.com/video'));
}, false);