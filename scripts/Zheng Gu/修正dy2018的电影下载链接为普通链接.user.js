// ==UserScript==
// @name         修正dy2018的电影下载链接为普通链接
// @version      0.1
// @description  dy2018的下载链接添加了javascript，删除这些javascript并把链接转换成普通链接
// @author       Zheng Gu (zhenzegu@gmail.com)
// @match        *://www.dy2018.com/*
// @namespace https://greasyfork.org/users/195174
// ==/UserScript==

(function() {
    'use strict';

    var links = document.querySelectorAll('[title="迅雷专用高速下载"]');
    for (var i in links) {
        var link = links[i];
        link.removeAttribute("title");
        link.removeAttribute("thunderpid");
        link.removeAttribute("thundertype");
        link.removeAttribute("thunderrestitle");
        link.removeAttribute("onclick");
        link.removeAttribute("oncontextmenu");
        link.href = link.text;
    }
})();