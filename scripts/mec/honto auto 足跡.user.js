// ==UserScript==
// @name        honto auto 足跡
// @namespace   honto auto 足跡
// @description その日初めてサイトを訪れた場合足跡を自動クリック
// @include     http://honto.jp/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var date = new Date();
var today = date.getFullYear()+'/'+(date.getMonth() + 1)+'/'+date.getDate();
var yesterday = GM_getValue("date");

setTimeout(function(){
if(yesterday!=today){
	window.location.href = "https://honto.jp/my/account/point/footmark.html";
	setTimeout(function(){
  	  $(".stCenter").children("a").trigger("click");
 	 }, 500);
}
GM_setValue("date", today);
}, 1000);
