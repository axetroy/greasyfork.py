// ==UserScript==
// @name         批量提取人人影视专链
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  打开人人影视分享页时复制页面内所有人人专链到粘贴板
// @author       Loyle
// @include      http://zmz*.com/*
// @grant        GM_setClipboard
// ==/UserScript==

var url = "";
var alist = document.getElementsByClassName("btn rrdown");
	for(var j = 0;j<alist.length;j++){
		var u = alist[j].getAttribute('data-url');
		if(u == "" || u == null || u == undefined){
		}else{
		url+=(u+'\n')
		}
	}
//console.log(url);
GM_setClipboard(url, 'text')
alert("已复制到粘贴板");