// ==UserScript==
// @name         yinyuetai-all
// @namespace    https://github.com/turnon/yinyuetai_all
// @version      0.0.5
// @description  yinyuetai
// @author       block24block@gmail.com
// @match       *://www.yinyuetai.com/fanclub/*
// @grant        none
// @require 	 https://greasyfork.org/scripts/372188-ateles/code/ateles.js?version=630732
// ==/UserScript==
Ateles(['jq', 'page_loader'], function (jq, page_loader) {
  var $ = jq;
  page_loader({
    page_count: function () {
      var $page_count = $(".page-nav span:last-child");
      return parseInt($page_count.text().replace(/[^0-9]/g, ""));
    },
    next_page: function (n) {
      return window.location.href + '/' + n;
    },
    append_page: function (data) {
      var $mod = $(data).find(".mod");
      $mod.find(".thread_list").remove();
      $(".mod:last-child").after($mod);
    },
    button: function () {
      var $btn = $('<span>load all</span>');
      $(".page-nav span:last-child").before($btn);
      return $btn;
    }
  })
})