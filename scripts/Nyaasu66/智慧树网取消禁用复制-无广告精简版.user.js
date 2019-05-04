// ==UserScript==
// @name         智慧树网取消禁用复制-无广告精简版

// @description         智慧树网取消禁用右键禁用菜单与复制功能
// @description:zh-TW   智慧樹網取消禁用右鍵禁用菜單與複製功能
// @description:zh-CN   智慧树网取消禁用右键禁用菜单与复制功能

// @namespace    http://tampermonkey.net/
// @author       Nyaasu
// @include      *://exam.zhihuishu.com/*
// @version      0.3
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 取消禁用右键菜单
    document.oncontextmenu = function(){
        event.returnValue = true;
    };
    // 取消禁用选中功能
    document.onselectstart = function(){
        event.returnValue = true;
    };
})();