// ==UserScript==
// @name         江苏科技大学教务系统
// @namespace    https://github.com/StarUDream/
// @version      0.1
// @description  解决教务系统链接在现代浏览器中无法点开的问题
// @author       StarUDream
// @match        *://jwgl.just.edu.cn:8080/*
// ==/UserScript==

(function() {
    'use strict';
    $('a').each(function (index, item) {
        var href = item.href;
        if (href.substr(0, 16) === 'javascript:JsMod') {
            item.target = '_blank';
            item.href = href.substr(18, href.indexOf('\'', 18) - 18);
        }
        if (href.substr(0, 20) === 'javascript:JsOpenWin') {
            item.target = '_blank';
            item.href = href.substr(22, href.indexOf('\'', 22) - 22);
        }
    });
})();