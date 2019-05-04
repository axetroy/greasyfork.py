// ==UserScript==
// @name          PiaoTian
// @description   Browse PiaoTian by left and right arrow key
// @include       https://www.piaotian.com/*
// @version 0.0.1.20180826024439
// @namespace http://diveintogreasemonkey.org/download/
// ==/UserScript==

document.onkeydown=function jumpPage(e) {
  if (e.keyCode==37) location=document.getElementsByClassName("bottomlink")[0].getElementsByTagName("a")[0]; // left arrow
  if (e.keyCode==39) location=document.getElementsByClassName("bottomlink")[0].getElementsByTagName("a")[5]; // right arrow
}