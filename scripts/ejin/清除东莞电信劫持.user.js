// ==UserScript==
// @name        清除东莞电信劫持
// @description 清除东莞电信HTTP框架劫持，无法确定是否支持其他地方。
// @namespace   babe101aa7877fa30cf14bc6f7ba20cb
// @include     http://*
// @version     2013.09.08
// ==/UserScript==

if ( typeof(old_url)!="undefined" && typeof(param)!="undefined" && typeof(content)!="undefined") {
	//alert('电信狗日的弹窗又来了')
	location.href = old_url.split("?")[0];
	//prompt("电信狗日的弹窗又来了",content) //弹出信息框告知弹窗网址便于复制
}