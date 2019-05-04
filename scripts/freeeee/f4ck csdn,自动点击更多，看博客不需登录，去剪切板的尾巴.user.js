// ==UserScript==
// @name         f4ck csdn,自动点击更多，看博客不需登录，去剪切板的尾巴
// @namespace    http://tampermonkey.net/
// @version      0.1.1.3
// @description  f4ck csdn：自动点击更多，看博客不需登录，去剪切板的尾巴
// @author       Linfree
// @match        *://blog.csdn.net/*
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    //清除要求登陆
    localStorage.clear();
    //自动展开
    if (document.getElementById("btn-readmore")){
        document.getElementById("btn-readmore").click();
    } 
    //删除剪切板尾巴
    function addLink(e) {
        e.preventDefault();
        var pagelink = '\nRead more: ' + document.location.href,
            copytext = window.getSelection();
        var clipdata = e.clipboardData || window.clipboardData;
        if (clipdata) {
            clipdata.setData('Text', copytext);
        }
    }
    document.addEventListener('copy', addLink);
    ////////////////
})();