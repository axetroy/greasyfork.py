// ==UserScript==
// @name         去除汽车之家论坛列表页视频预览图
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  汽车之家论坛视频帖在论坛列表页里会显示视频预览图，严重影响阅读体验，此脚本可以屏蔽视频预览图。
// @author       李多多
// @match        *://club.autohome.com.cn/bbs/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("dd.outvideo").hide();
})();