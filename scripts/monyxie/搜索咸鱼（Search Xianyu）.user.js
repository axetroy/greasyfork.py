// ==UserScript==
// @name         搜索咸鱼（Search Xianyu）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  给咸鱼网站添加一个搜索框。（Add an search bar to the Xianyu website(https://2.taobao.com)）.
// @author       You
// @match        https://s.2.taobao.com/*
// @match        https://2.taobao.com/*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

  let $ = document.querySelector.bind(document);

  $('#J_IdleHeader').insertAdjacentHTML('beforeend', ''
  + '<div class="idle-search">'
  + ' <form method="get" action="//s.2.taobao.com/list/list.htm" name="search" target="_top">'
  + '   <input class="input-search" id="J_HeaderSearchQuery" name="q" type="text" value="" placeholder="搜闲鱼" />'
  + '   <input type="hidden" name="search_type" value="item" autocomplete="off" />'
  + '   <input type="hidden" name="app" value="shopsearch" autocomplete="off" />'
  + '   <button class="btn-search" type="submit"><i class="iconfont">&#xe602;</i><span class="search-img"></span></button>'
  + ' </form>'
  + '</div>'
  );
}) ();