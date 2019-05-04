// ==UserScript==
// @name         CSDN 文章自动展开
// @namespace    undefined
// @version      1.0
// @description  这是一个用于 CSDN 的文章自动展开脚本，不必再浪费时间去点击「阅读更多」。
// @author       LeoLun
// @include      https://blog.csdn.net/*/article/details/*
// ==/UserScript==

document.getElementsByClassName('hide-article-box text-center')[0].remove();
document.getElementById('article_content').style.height = 'auto';