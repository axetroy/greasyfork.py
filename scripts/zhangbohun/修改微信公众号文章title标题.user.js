// ==UserScript==
// @name         修改微信公众号文章title标题
// @namespace    http://zhangbohun.github.io/
// @version      0.1
// @description  修改微信公众号文章title标题（默认全部会变成公众号名称不方便存书签）
// @author       zhangbohun
// @match        *://mp.weixin.qq.com/*
// @run-at 	     document-end
// ==/UserScript==

window.onload =function() {
    'use strict';
	window.setTimeout(function(){ document.getElementsByTagName('title')[0].innerHTML= document.getElementById('activity-name').innerHTML; }, 3000);
	window.setTimeout(function(){ document.getElementsByTagName('title')[0].innerHTML= document.getElementById('activity-name').innerHTML; }, 5000);
	window.setTimeout(function(){ document.getElementsByTagName('title')[0].innerHTML= document.getElementById('activity-name').innerHTML; }, 7000);
};