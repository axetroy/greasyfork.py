// ==UserScript==
// @name        程序师网站文章全文显示
// @namespace   程序师网站文章全文显示
// @description 程序师网站文章去除“余下全文”按钮，直接全文显示
// @include     http://www.techug.com/*
// @version     1
// @grant       none
// ==/UserScript==
$('#content0').css('maxHeight', '100%');
$('#rest').hide();