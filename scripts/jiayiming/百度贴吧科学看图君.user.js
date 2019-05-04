// ==UserScript==
// @id                 tieba_simple_picview
// @name           百度贴吧科学看图君
// @version         2018.05.25
// @namespace   jiayiming
// @author          jiayiming
// @description   去除百度贴吧的连续看图模式，改为点击新标签打开无水印原图，同时支持帖子预览中“查看大图”按钮。
// @include         *://tieba.baidu.com/p/*
// @include         *://tieba.baidu.com/f?*
// @include         *://tieba.baidu.com/i/*
// @homepageURL  https://greasyfork.org/scripts/784/
// @require          http://code.jquery.com/jquery-3.3.1.slim.min.js
// @grant             unsafeWindow
// @run-at           document-end
// @note              2018.05.25	图片地址自适应http/https
// @note              2017.01.28	支持https
// @note              2015.04.02	度娘帖子列表改版
// ==/UserScript==

(function(){

	$(document).on('mousedown', '.BDE_Image', function(e){
		//帖中图片去除click
		unsafeWindow.$('.BDE_Image').unbind('click');
		//$(this).unbind('click');

		// 兼容其它腳本
		if (e.ctrlKey || e.altKey || e.shiftKey)
			return;

		this.onclick = function(e){
			if (e.button != 0)
				return true;

			var match = $(this).attr('src').match(/\/[a-z0-9]{20,}(?=\.[jpg|gif|png])/);
			console.log('pic_id',match);
			if (!match) {
				return;
			}
			var picSrc = location.protocol + '//imgsrc.baidu.com/forum/pic/item' + match[0] + '.jpg';
			window.open(picSrc);

			e.preventDefault();
			return false;
		};
	});

	// 帖子列表预览中图片，还原“查看大图”按钮链接
	$(document).on('mousedown', '.j_ypic', function(){
		var d = this.href;
		if (d.indexOf('pic_id') > 0) {
			var start = d.indexOf('pic_id') + 7;
			var end = d.indexOf('&', start);
			var pic = location.protocol + '//imgsrc.baidu.com/forum/pic/item/' + d.substring(start, end) + '.jpg'
			this.href = pic;
		}
	});

	// i贴吧帖子预览中图片，还原“查看大图”按钮链接
	$(document).on('mousedown', '.j_full', function(){
		var d = this.href;
		if (d.indexOf('pic_id') > 0) {
			var start = d.indexOf('pic_id') + 7;
			var end = d.indexOf('&', start);
			var pic = location.protocol + '//imgsrc.baidu.com/forum/pic/item/' + d.substring(start, end) + '.jpg'
			this.href = pic;
		}
	});
})();