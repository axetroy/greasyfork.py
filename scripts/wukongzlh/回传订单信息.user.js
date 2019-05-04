// ==UserScript==
// @name        回传订单信息
// @namespace   zlh.com
// @include     https://work.1688.com/home/buyer.htm#app/buyer_wholesale/buyList/*
// @version     1
// @grant       none
// @description 进入订单iframe
// ==/UserScript==

console.log("回传订单信息");
window.onload=function(){

	    var oo=document.getElementsByClassName("layout_iframe-iframe")[0];
	    var src=oo.getAttribute("src");
	    window.location.href=src;

}