// ==UserScript==
// @name        动漫花园Magnet修改
// @namespace   https://greasyfork.org/zh-CN/scripts/11494
// @description 修改Magnet磁力链接为百度云离线可以识别的形式
// @include     https://share.dmhy.org/topics/view/*
// @version     2
// @grant       none
// ==/UserScript==
var path_name=document.getElementById("tabs-1").childNodes[1].childNodes[2].pathname;
var slice_start=path_name.lastIndexOf("/")+1;
var slice_end=path_name.indexOf(".");
var torrent_hash=path_name.slice(slice_start,slice_end);
var a_magnet=document.getElementById("a_magnet");
a_magnet.href="magnet:?xt=urn:btih:"+torrent_hash;
a_magnet.innerHTML="magnet:?xt=urn:btih:"+torrent_hash;
