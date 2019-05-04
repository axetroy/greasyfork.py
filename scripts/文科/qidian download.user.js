// ==UserScript==
// @name        qidian download
// @namespace   http://h5.qidian.com
// @include     http://h5.qidian.com/bookreader.html*
// @version     1.1
// @description  方便在html5起点站下载小说
// @grant       unsafeWindow
// ==/UserScript==
;(function(){
	var $= unsafeWindow.$;
	(function($){
		$.getUrlParam = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return unescape(r[2]); return null;
		}
	})($);
	var id = $.getUrlParam('bookId') || $.getUrlParam('bookid');
	$(".controlbar ul").append("<li><a href='http://download.qidian.com/pda/"+id+".txt'>下载</a></li>");
})();