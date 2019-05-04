// ==UserScript==
// @name         去除网页复制文字添加水印
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       kooro@github
// @match    *://*.juejin.im/*
// @match    *://*.jianshu.com/*
// @match    *://*.csdn.net/*
// @match    *://*.geekbang.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setTimeout(function(){
        console.log('去除网页复制文字添加水印')
       document.addEventListener("copy", function (e) {
             var i =window.getSelection().toString().trim();
             e.clipboardData.setData("text/plain", i),
             e.clipboardData.setData("text/html", i)
        });
    },1000)
})();