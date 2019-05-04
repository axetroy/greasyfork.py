// ==UserScript==
// @name        迅雷快传显示全部下载链接
// @namespace   https://greasyfork.org/zh-CN/scripts/8399
// @author      天涯倦客
// @supportURL http://t.qq.com/HeartBlade
// @description 文件列表下面插入一个文本框，显示所有文件的下载链接（包括没勾选的）
// @include     http://kuai.xunlei.com/d/*
// @version     1.0
// @grant       none
// ==/UserScript==
(function(){
	var urls = '',i;
	var fname=document.querySelectorAll(".file_name");
	var flength=fname.length;
	for (i=0;i<flength;i++){
		urls+=fname[i].href+'\n';
	}
	var txt=document.createElement("textarea");
	txt.value=urls;
	txt.id="down_links";
	txt.style="width:677px;height:300px;";
	document.querySelectorAll(".file_w")[0].appendChild(txt);
	txt.focus();
	txt.select();
})();
