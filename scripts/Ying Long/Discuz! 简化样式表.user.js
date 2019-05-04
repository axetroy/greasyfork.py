// ==UserScript==
// @name Discuz! 简化样式表
// @description 隐藏不实用的界面元素，让界面简洁轻爽一点。
// @namespace Violentmonkey Scripts
// @match *://bbs.northdy.com/*
// @grant none
// @version 0.0.1.20180115182922
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".pl .quote, .pl .quote blockquote { background-image: none; } .pl .quote {border-style: solid; border-width: 1px 1px 1px 3px; border-color: #CDCDCD; padding-left: 10px} .favatar > *, table.plhin > tbody:nth-child(1) > tr:nth-child(1n+2), table.plhin > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) { display: none; } .favatar div:nth-of-type(1), .favatar div:nth-of-type(2), .favatar div:nth-of-type(3) {display: block} table.plhin > tbody:nth-child(1) > tr:nth-child(4) {display: contents} table.plhin > tbody > tr:nth-child(1) {border-width: 1px 0 0 0; border-style: solid; border-color: #CDCDCD} td.pls {background-color: #f9f9f9}";
document.head.appendChild(css);