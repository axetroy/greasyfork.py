// ==UserScript==
// @name 	 	 万书网小说下载
// @namespace    http://www.txt2017.com/
// @description  快捷下载
// @version      0.0.2
// @match        *://www.txt2017.com/*
// @match        *://m.txt2017.com/*
// @icon		 http://7xo0rb.com1.z0.glb.clouddn.com/public/16-12-5/39527384.jpg
// @require 	 http://cdn.bootcss.com/jquery/2.2.4/jquery.js
// @author       Hunlongyu
// @licence      WTFPL
// @grant        none
// @encoding     utf-8
// @date         2/12/2016
// ==/UserScript==

$(function () {
	var a = $("#downAddress a").attr("onclick");																				//获取链接
	var c = a.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/)[0];		//提取地址
	location.href = c;																											//打开地址
});