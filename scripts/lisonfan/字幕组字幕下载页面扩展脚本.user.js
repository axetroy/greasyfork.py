// ==UserScript==
// @name			字幕组字幕下载页面扩展脚本
// @namespace			https://github.com/LisonFan/
// @icon			http://files.zmzjstu.com/images/dibulogo.png
// @author			LisonFan
// @version			0.8
// @description			给字幕组的字幕下载页面增加一个字幕版本对应的视频文件下载链接
// @match			http*://www.zmz2017.com/subtitle/*
// @match			http*://www.zimuzu.tv/subtitle/*
// @match			http*://www.zimuzu.io/subtitle/*
// @grant			none
// @license			MIT License
// ==/UserScript==

(function() {
    'use strict';
    var text = document.getElementsByClassName('subtitle-info')[0].innerText;
    var textGSIndex = text.search("【格式】");
    var textBBIndex = text.search("【版本】");
    var text2 = text.substring(textGSIndex,textBBIndex);
    var text3 = text2.substring(4,textGSIndex);
	var arr = text3.split(" ");
	for(var i = 0; i < arr.length; i++){
	    var urlStr = 'https://rarbg.to/torrents.php?search=' + arr[i];
	    var url = "<h3>" + "字幕对应视频下载链接：" + "<a href='" + urlStr + "'target='_blank'>" + arr[i] + "</a>" + "</h3>";
	    var test4 = document.getElementsByClassName('subtitle-links tc')[0].innerHTML;
	    document.getElementsByClassName('subtitle-links tc')[0].innerHTML = test4 + url;
	}
})();
