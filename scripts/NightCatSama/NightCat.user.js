
Tampermonkey
v4.3.6 by Jan Biniok
编辑 - NightCat
×
 ?
已安装脚本
设置
实用程序
帮助
NightCat
by You
编辑器
设置
保存到磁盘保存重置编辑出厂重置关闭运行语法检查更新 URL:
搜索替换跳转到行插入构造函数全部自动缩进

1
// ==UserScript==
2
// @name         NightCat
3
// @namespace    http://tampermonkey.net/
4
// @version      0.1
5
// @description  hack某个学习网页的自动暂停的代码
6
// @author       You
7
// @match        http://*/*
8
// @grant        none
9
// ==/UserScript==
10
​
11
(function() {
12
    'use strict';
13
    window.onload = function () {
14
        var el = document.getElementById('iframe').contentDocument.body.querySelector('iframe');
15
        var reader = el.contentDocument.body.querySelector('#reader');
16
        reader.onmouseup = function () {
17
            setTimeout(function () {
18
                reader.onmouseout = function (e) { e.preventDefault(); };
19
                el.contentWindow.onblur = function (e) { e.preventDefault(); };
20
                el.contentDocument.visibilityState = function (e) { e.preventDefault(); };
21
            }, 0);
22
        };
23
    };
24
})();
