// ==UserScript==
// @name 	 	 Txt电子书 www.txtshu365.com 小说下载
// @namespace    http://www.txtshu365.com/
// @description  快捷下载
// @version      0.0.2
// @match        *://www.txtshu365.com/*
// @icon		 http://7xo0rb.com1.z0.glb.clouddn.com/public/16-12-5/39527384.jpg
// @require 	 http://cdn.bootcss.com/jquery/2.2.4/jquery.js
// @author       Hunlongyu
// @licence      WTFPL
// @grant        none
// @encoding     utf-8
// @date         2/12/2016
// ==/UserScript==

$(function () {
	if($('div').hasClass('twolist')){
		var a = 'http://www.txtshu365.com' + $(".twolist a").attr("href");
		window.location.href = a;
	}

	if($('a').hasClass('addone')){
		var flag = true;
	    if(flag){
	        var b = $(".addone").attr("href");
			window.location.href = b;
	        flag = false;
	    }
	}
});