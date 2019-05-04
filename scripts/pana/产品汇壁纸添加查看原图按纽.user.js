// ==UserScript==
// @name         产品汇壁纸添加查看原图按纽
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.1.3
// @description  添加查看原图按纽
// @author       pana
// @include      http*://www.prohui.com/b*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	const groupReg = /http[a-z:\-\/.]+\/[0-9a-z\/\-_.]+\.(jpg|jpeg|png|bmp|gif)/i;
	(function PicDownload() {
		let wallpaper_elem = document.getElementsByClassName("wallpaper_content")[0];
		let pic_url = window.getComputedStyle(wallpaper_elem, null).getPropertyValue('background-image');
		pic_url = groupReg.exec(pic_url)[0];
		let watch_pic = document.createElement("a");
		watch_pic.href = pic_url;
		watch_pic.target = '_block';
		watch_pic.innerText = '查看原图';
		let download_elem = document.getElementsByClassName("wallpaper_download")[0].getElementsByTagName("a")[0];
		download_elem.parentNode.insertBefore(watch_pic, download_elem)
	})()
})();