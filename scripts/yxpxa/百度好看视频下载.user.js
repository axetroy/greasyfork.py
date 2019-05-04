// ==UserScript==
// @name         百度好看视频下载
// @namespace    https://haokan.baidu.com/
// @version      0.11
// @description  下载百度 sv.baidu.com 的视频
// @author       yxpxa
// @icon         https://sv.baidu.com/favicon.ico
// @match        *://sv.baidu.com/*
// @match        *://haokan.baidu.com/*
// @run-at       document-end
// ==/UserScript==
/*在浏览器地址栏贴入视频链接，然后在新页面里右键下载*/
if(curVideoMeta){location.href=curVideoMeta.playurl}