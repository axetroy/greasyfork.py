// ==UserScript==
// @name         B站添加绘画、摄影投稿，以及发布日常
// @namespace    https://853lab.com
// @version      1.0.1
// @description  更改B站导航栏发布按钮中添加绘画投稿，摄影投稿，以及发布日常
// @author       Sonic853
// @match        *://www.bilibili.com/*
// @match        *://message.bilibili.com/*
// @match        *://space.bilibili.com/*
// @match        *://member.bilibili.com/*
// @match        *://account.bilibili.com/*
// @match        *://big.bilibili.com/*
// @match        *://t.bilibili.com/*
// @grant        unsafeWindow
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector(".nav-menu .up-load .u-link").setAttribute("onmouseover","setTimeout(function (){if(document.querySelector('.nav-menu .up-load .up-nav').getElementsByTagName('li').length == 5){document.querySelector('.nav-menu .up-load .up-nav').innerHTML += '<li><a href=\"//h.bilibili.com/eden/publish#/draw\" target=\"_blank\"><i class=\"bili-icon rect i-vp\"></i> <span>绘画投稿</span></a></li><li><a href=\"//h.bilibili.com/eden/publish#/cos\" target=\"_blank\"><i class=\"bili-icon rect i-vp\"></i> <span>摄影投稿</span></a></li><li><a href=\"//h.bilibili.com/eden/publish#/daily\" target=\"_blank\"><i class=\"bili-icon rect i-vp\"></i> <span>发布日常</span></a></li>'}}, 400)");
})();