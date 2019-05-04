// ==UserScript==
// @name         哎生活vs爱生活-网站显示下载地址
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  在电脑上用这个网站，不切换UA就可以显示下载链接。
// @author       xiaopi
// @match        *://*.ashvsash.com/*
// @match        *://*.ashvsash.cc/*
// @grant        none
// ==/UserScript==

$("#content .context h2").show();

