/**
 * Created by turnon on 2018/9/10.
 */
// ==UserScript==
// @name         douban-all-photos
// @namespace    https://github.com/turnon/douban_all_photos
// @version      0.1.1
// @description  douban_all_photos
// @author       block24block@gmail.com
// @match       *://movie.douban.com/*/photos*
// @grant        none
// @require https://greasyfork.org/scripts/372188-ateles/code/ateles.js?version=630732
// ==/UserScript==
Ateles(['page_loader'], function (page_loader) {
  var $ = jQuery
  page_loader({
    page_count: function () {
      return parseInt($('.paginator .next').prev().text())
    },
    next_page: function (n) {
      var start = (n - 1) * 30
      return window.location.href + '/?type=C&sortby=like&size=a&subtype=a&start=' + start
    },
    append_page: function (data) {
      var $article = $(data).find(".article")
      $article.find(".opt-bar-line").remove()
      $(".article").last().after($article)
    },
    button: function () {
      var $btn = $('<span>&gt;&gt;&gt;all</span>')
      $('.paginator .next').after($btn)
      return $btn
    }
  })
})