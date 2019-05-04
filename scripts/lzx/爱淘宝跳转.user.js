// ==UserScript==
// @name         爱淘宝跳转
// @namespace    http://liuzhixin.net/
// @version      0.2
// @description  JumpAitaobao。跳过爱淘宝，爱淘宝页面自动跳转。2015.6.20，按原网页按钮名称更新。
// @author       lzx
// @match        http://ai.taobao.com/*
// @grant        everyone
// ==/UserScript==

window.open(document.getElementsByClassName("right-btn")[0].href,"_self");
window.open(document.getElementsByClassName("featured-btn")[0].href,"_self");