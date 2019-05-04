// ==UserScript==
// @name         英文版本自动跳中文 插件
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *php.net/manual/en/*
// @match        *developer.mozilla.org/en-US/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //获取当前页面
    var href = window.location.href;

    //php 官网
    if(href.indexOf('/zh/')==-1){
        href = href.replace("/en/", "/zh/");
        window.location.href =href;
    }


    //developer.mozilla.org
    if(href.indexOf('/zh-CN/')==-1){
        href = href.replace("/en-US/", "/zh-CN/");
        window.location.href =href;
    }
})();