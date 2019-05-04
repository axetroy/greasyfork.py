// ==UserScript==
// @name         鹏友智慧树助手
// @namespace    http://www.pengpal.cn
// @version      2.3
// @description  智慧树看课助手，自动1.5倍速，自动标清，无视答题检验，防进度丢失，防漏看扫描，自动下一节。
// @author       鹏友圈（ www.pengpal.cn ）
// @match        http://study.zhihuishu.com/learning/*
// @grant        none
// ==/UserScript==
window.onload = function(){
    var script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.setAttribute("src","//pengpal.cn/projects/ppzhszs/script.js");
    document.head.appendChild(script);
};