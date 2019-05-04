// ==UserScript==
// @name         修改有道云笔记分享页面宽度
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  修改有道云笔记分享页面宽度，以便更加适合阅读。
// @author       High Jiang
// @match        *://note.youdao.com/share/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');
    style.innerHTML = '.file{ min-width: 256px; max-width: 1080px; width: 100%; padding-left: 0px; padding-right: 0px;} .file-name-container{ padding-left: 5%;}';
    document.head.appendChild(style);

})();