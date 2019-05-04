// ==UserScript==
// @name         ruby-china-all-excellent
// @namespace    https://github.com/turnon/ruby_china_all_excellent
// @version      0.0.2
// @description  ruby_china_all_excellent
// @author       block24block@gmail.com
// @match        https://ruby-china.org/topics/excellent
// @grant        none
// @require https://greasyfork.org/scripts/372188-ateles/code/ateles.js?version=630732
// ==/UserScript==
Ateles(['page_loader'], function (page_loader) {
  page_loader({
    page_count: function () {
      return parseInt($('.pagination .next').prev().text().trim())
    },
    next_page: function (n) {
      return window.location.href + '?page=' + n
    },
    append_page: function (data) {
      var $row = $($(data).find(".row")[1])
      $row.find(".sidebar").remove()
      $("#main .row").last().after($row)
    },
    button: function () {
      var $btn = $('<li class="page-item"><a class="page-link">all</a></li>')
      $('.pagination .next').after($btn)
      return $btn
    }
  })
})