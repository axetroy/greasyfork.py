// ==UserScript==
// @name        全网去除Google广告
// @namespace    http://www.vernonshao.com
// @version      0.1
// @description  去除全网讨厌的Google广告
// @author       Vernon
// @match        *://*/*
// @require     https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// ==/UserScript==

(function () {

	//删除所有广告
	var x = document.getElementsByClassName("ad");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}

	//删除广告
	var y = document.getElementsByClassName("adsbygoogle");
	var j;
	for (j = 0; j < y.length; j++) {
		y[j].style.display = "none";
	}

	//删除页面广告
	$(".adsbygoogle").remove();


})();
