// ==UserScript==
// @name         微博视频取消自动播放下一个视频
// @version      1.0.8
// @description  微博视频取消自动播放
// @author       心满
// @match        *://*.weibo.com/tv/*
// @run-at       document-idle
// @grant        unsafeWindow
// @license      MIT
// @icon         https://weibo.com/favicon.ico
// @namespace https://greasyfork.org/users/85311
// ==/UserScript==

document.querySelector('.weibo_player .outerline').style.border = 'none';
document.querySelector('.W_icon_tag').style.display = 'none';
document.querySelector('.weibo_player .wb_tv_switch input[type=checkbox]').click();
var doc = document.body.scrollTop ? document.body : document.documentElement
doc.scrollTop = 0