// ==UserScript==
// @name        百度網盤自定義密碼
// @namespace   Ahuangzai
// @description 可以在發布時修改產生的密碼，僅限4位數
// @include     http://pan.baidu.com/*
// @include     https://pan.baidu.com/*
// @version     1.0
// @grant       none
// ==/UserScript==
var myHandle;

function myFunction() {
	var script = require(["function-widget-1:share/util/service/createLinkShare.js"]);
	script.prototype.makePrivatePassword = function() { return prompt("請輸入自定義密碼", ""); };
	if (script != undefined)
		clearInterval(myHandle);
}

myHandle = setInterval(myFunction, 1000);