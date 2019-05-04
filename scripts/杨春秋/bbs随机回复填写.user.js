// ==UserScript==
// @name          bbs随机回复填写
// @description   bbs随机回复填写*
// @include       http://isangna.org/*
// @include       http://www.bananahk.net/*
// @include       http://www.puba8.com/
// @version       1.0
// @author        Youngcc
// @namespace https://greasyfork.org/users/8717
// ==/UserScript==

var string = "啥也不说了，楼主就是给力%果断回帖，如果沉了就是我弄沉的很有成就感%多谢師兄報告%謝謝你的分享!!!!%收藏了。谢谢楼主分享";
var array = string.split("%");  
var value = array[Math.round(Math.random()*(array.length-1))]; 
document.getElementById("fastpostmessage").value = value;