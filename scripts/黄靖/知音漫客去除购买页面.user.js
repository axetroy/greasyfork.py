// ==UserScript==
// @name         知音漫客去除购买页面
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://*.zymk.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        var el1 = document.getElementById('layui-layer-shade1');
        var el2 = document.getElementById('layui-layer1');
        if(!!el1){
            console.log("移除蒙层");
            document.body.removeChild(el1);
        }
        if(!!el2){
            console.log("移除付费界面");
            document.body.removeChild(el2);
        }
    }, 2);
    // Your code here...
})();