// ==UserScript==
// @name        设置以及获取浏览器缓存
// @namespace   
// @description 第一个测试脚本。
// @icon        
// @include     http*
// @include     ftp*
// @version     1.4
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==
function setCookie(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}