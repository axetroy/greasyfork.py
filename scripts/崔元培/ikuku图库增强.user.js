// ==UserScript==
// @name         ikuku图库增强
// @namespace    http://www.c-xyyx.cn
// @version      0.1
// @description  hello word
// @author       逍遥一仙
// @include        http://www.ikuku.cn/project/*
// @include        http://www.ikuku.cn/concept/*
// @grant        none
// @run-at document-end
// ==/UserScript==

window.onload=function(){
var aaa=document.getElementsByClassName("mail_share")[0];
var bbb=aaa.getAttributeNode("onclick").nodeValue.replace(/[^0-9]/ig,"");
aaa.href='http://www.ikuku.cn/waterfall.php?image_data=single&ID='+bbb;
aaa.onclick="";
aaa.innerHTML="打开图库";}