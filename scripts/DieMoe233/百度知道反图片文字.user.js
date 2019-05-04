// ==UserScript==
// @name         百度知道反图片文字
// @namespace    http://TouHou.DieMoe.net/
// @version      0.2
// @description  通过自动刷新避免看见图片字体，去你妈的word-replace。
// @author       DieMoe
// @run-at        document-body
// @match        *://zhidao.baidu.com/question/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var elements = document.querySelectorAll('.word-replace');
    Array.prototype.forEach.call(elements, function(el, i){
        window.location.href="";
    });
})();