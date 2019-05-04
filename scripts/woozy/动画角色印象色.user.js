// ==UserScript==
// @name         动画角色印象色
// @version      0.0.3
// @description  将印象色字段的背景改为该颜色
// @include      /https?:\/\/(bgm\.tv|bangumi\.tv|chii\.in)\/character\/.+/
// @author       woozy
// @grant        none
// @namespace    im.woozy.bangumi
// ==/UserScript==
'use strict';

$('#infobox li').each(function() {
  var key = $(this).children('.tip').text();
  if (~key.indexOf('印象色')) {
    var str = $(this).contents()[1].textContent;
    var color = str.match(/#[0-9a-f]{6}/i)[0] || str.match(/#[0-9a-f]{3}/i)[0] || str;
    $(this).css({backgroundColor: color});
  }
});
