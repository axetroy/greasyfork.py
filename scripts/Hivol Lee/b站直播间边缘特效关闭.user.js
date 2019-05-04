// ==UserScript==
// @name b站直播间边缘特效关闭
// @description 关闭b站直播间右侧的22娘礼物特效和左侧的新年活动爆竹特效
// @author Hivol
// @namespace http://www.hasqo.cn
// @version 1.1.0
// @include *://live.bilibili.com/*
// @license MIT
// @supportURL http://www.hasqo.cn
// @grant None
// ==/UserScript==

(function () {
    'use strict';

    document.getElementById("my-dear-haruna-vm").style.display = "none";
    document.getElementById("spring-2018-section").style.display = "none";
})();