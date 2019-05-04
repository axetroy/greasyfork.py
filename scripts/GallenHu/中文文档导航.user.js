// ==UserScript==
// @name         中文文档导航
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  为英文文档添加中文文档的跳转链接
// @author       You
// @match        *://gobyexample.com/*
// @match        *://www.typescriptlang.org/*
// @require https://cdn.bootcss.com/jquery/1.12.2/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var href = window.location.href;

    if (href.indexOf('gobyexample.com') > -1) {
        var cnHref = href.replace('https://gobyexample.com/', 'https://books.studygolang.com/gobyexample/');
        var html = `&nbsp;&nbsp;<a href="${cnHref}" target="_blank">→中文版</a>`;
        $('.example h2').append(html);
    }

    if (href.indexOf('typescriptlang.org') > -1) {
        var html = '<li class=""><a href="https://www.tslang.cn/" target="_blank">中文版</a></li>';
        $('.nav.navbar-nav').append(html);
    }
})();