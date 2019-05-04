// ==UserScript==
// @name        动漫花园仿极影补丁
// @namespace   https://greasyfork.org/zh-CN/scripts/11034
// @description 配合动漫花园仿极影样式使用
// @include     http://share.dmhy.org/*
// @include     https://share.dmhy.org/*
// @version     1.2
// @grant       none
// ==/UserScript==
//添加今日类名
document.getElementsByClassName("jmd_base")[0].firstChild.childNodes[new Date().getDay()].className="today";
//下载链接置顶
var btlist=document.getElementById("resource-tabs");
var nfo=document.getElementsByClassName("topic-nfo")[0];
var main=document.getElementsByClassName("topic-main")[0];
main.insertBefore(btlist,nfo);
