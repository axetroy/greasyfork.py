// ==UserScript==
// @name         豆瓣小组去除标题省略号
// @namespace    https://littlee.github.io/
// @version      0.1
// @description  去除豆瓣小组的标题省略号，显示完整标题
// @author       Littlee
// @match        https://www.douban.com/group/*
// @grant        none
// ==/UserScript==
(function() {
  $('.olt')
    .find('td.title > a, td.td-subject > a')
    .each(function() {
      var $this = $(this);
      $this.text($this.attr('title'));
    });
})();