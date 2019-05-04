// ==UserScript==
// @name         微信公众号：100秒分享 | 百秒分享| 图虫图片下载 | 微信：xiongwk2008 | @熊伟康
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://tuchong.com/*
// @require      http://cdn.bootcss.com/jquery/2.0.0/jquery.min.js
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_download
// ==/UserScript==

(function() {
	'use strict';
	var retry = 0;
	var maxRetryTimes = 3;
	var timer;
	timer = setInterval(function() {
		if(retry < maxRetryTimes) {
			var imgsContainer = $('.scene-container-next');
			if(imgsContainer.length > 0) {
				getOneImages(imgsContainer);
				getAllImages(imgsContainer);
				clearInterval(timer);
			}
			retry++;
		} else {
			clearInterval(timer);
			console.log('没有找到图片元素，可刷新尝试');
		}
	}, 1000)

	// 下载单页按钮
	function createdownloadBtn(imgHref, imgName) {
		$('.icon-download').before('<span id="diy-downloadOneImg" style="color:000;background:#fff;padding:10px;cursor:pointer">下载单页</span>');
		$('#diy-downloadOneImg').on('click', function() {
			GM_download(imgHref, imgName)
		})
	}

	// 下载套图按钮
	function createdownloadAllBtn(allImages) {
		$('.icon-download').before('<span id="diy-downloadAllImg" style="margin-left:15px;color:000;background:#fff;padding:10px;cursor:pointer">下载套图</span>');
		$('#diy-downloadAllImg').on('click', function() {
			for (var i = 0; i < allImages.length; i++) {
				var imgNames = $('.aside-post-title').text() + (i+1);
				GM_download(allImages[i],imgNames)
			}
		})
	}

	// 获取单页地址
	function getOneImages(container) {
		var imgHref = container.find('.scene-item').not('.prev-scene').not('.next-scene').find('img').attr('src');
		var imgName = $('.aside-post-title').text() + imgHref.split('/f/')[1];
		var re = /http/;
		if(!re.test(imgHref)) {
			imgHref = 'http:' + imgHref
		}
		createdownloadBtn(imgHref, imgName);
	}

	// 获取套图地址
	function getAllImages(container) {
		var imgHrefs = container.find('.scene-item');
		var allImages = [];
		for(var i = 0; i < imgHrefs.length; i++) {
			var curHref = $(imgHrefs[i]).find('img').attr('src');
			var re = /http/;
			if(!re.test(curHref)) {
				curHref = 'http:' + curHref
			}
			allImages.push(curHref)
		}
		createdownloadAllBtn(allImages);
	}

})();