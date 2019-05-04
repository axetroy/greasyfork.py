// ==UserScript==
// @name                MDN自动中文 2019可用
// @description         自动首选中文版本，

// @author              cl96
// @supportURL     https://github.com/cl96    
// @license             GPL-3.0

// @include             https://developer.mozilla.org/en-US/*
// @grant               none
// @run-at              document-start

// @version             1.0.1
// @modified            01/15/2019
// @namespace https://greasyfork.org/users/239642
// ==/UserScript==



!function() {


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
}();