// ==UserScript==
// @name         虎扑论坛新标签
// @namespace    weiainijiujiu@126.com
// @version      0.4
// @description  虎扑论坛打开新标签页
// @author       wangjojo
// @match        https://bbs.hupu.com/*
// @grant        none
// @note         修改失效bug
// ==/UserScript==
(function() {
    'use strict';
    (document.querySelectorAll(".titlelink > a")||[]).forEach(function(item){
        item.setAttribute("target","_blank");
    });
})();