// ==UserScript==
// @name         投稿按钮：想变得可爱
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  让 B 站的投稿按钮恢复旧版样式
// @author       duoduoeeee
// @match        https://*.bilibili.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    console.log("injected!!");
    document.getElementsByClassName("u-link")[0].style = "letter-spacing: 6px; height: 50px; line-height: 47px; padding-left: 2px;";
    document.getElementsByClassName("up-nav")[0].style = "top: 0px;"
})();