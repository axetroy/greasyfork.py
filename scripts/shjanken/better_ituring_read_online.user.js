// ==UserScript==
// @name        better_ituring_read_online
// @namespace   ituring
// @description 修改在线看 ituring.com.cn 的文章的样式
// @include     http://www.ituring.com.cn/tupubarticle/*
// @version     1
// @grant       none
// ==/UserScript==
var article_area = document.getElementsByClassName('markdown-body');
if (article_area != null) {
  article_area[0].style.border = '0px'
}
