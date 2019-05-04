// ==UserScript==
// @name         动漫花园种子自动重命名
// @license      GPL version 3
// @encoding     utf-8
// @require      http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @match        *://share.dmhy.org/topics/view/*
// @author       菜姬
// @description:zh-cn 自动将动漫花园的会员专用链接所指向的文件文件名改为标题名
// @version 0.0.1.20180421105127
// @namespace https://greasyfork.org/users/171607
// @description generate torrent name for dmhy
// ==/UserScript==
var wholeblock = $("#tabs-1 p:first-child");
var urlblock = wholeblock.children("a");
var filename = urlblock.html()+".torrent";
urlblock.attr("download", filename);