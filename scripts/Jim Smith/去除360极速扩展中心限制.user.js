// ==UserScript==
// @name         去除360极速扩展中心限制
// @namespace    undefined
// @version      0.0.1
// @description  让其他基于chromium的浏览器可以直接从360极速扩展中心下载扩展
// @match        http://ext.chrome.360.cn/*
// @match        https://ext.chrome.360.cn/*
// @run-at       body-start
// @compatible   chrome
// @grant        none
// @license      GPL v3
// ==/UserScript==

Object.defineProperty(navigator,"userAgent",{value:"Mozilla/5.0 (Windows NT 6.1 AppleWebKit/535.19 KHTML, like Gecko) Chrome/48.0.1025.168 Safari/535.19 QIHU 360EE",writable:false,configurable:false,enumerable:true});
document.getElementById('yellowtip').remove();