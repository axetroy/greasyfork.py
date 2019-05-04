// ==UserScript==
// @name         Google翻译自动中英互译
// @description  自动切换输出语言
// @namespace    https://greasyfork.org/users/197529
// @author       kkocdko
// @version      0.3
// @include      *://translate.google.cn/*
// ==/UserScript==
'use strict';

document.querySelector('.sl-selector a').addEventListener('DOMSubtreeModified', function() {
    location.hash = this.innerText == '检测到英语'
        ? location.hash.replace('tl=en', 'tl=zh-CN')
        : location.hash.replace('tl=zh-CN', 'tl=en');
});
