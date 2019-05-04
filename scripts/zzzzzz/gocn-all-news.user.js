// ==UserScript==
// @name         gocn-all-news
// @namespace    https://github.com/turnon/gocn_all_news
// @version      0.0.1
// @description  gocn_all_news
// @author       block24block@gmail.com
// @match        https://gocn.vip/explore/category-14
// @grant        none
// @require https://greasyfork.org/scripts/372188-ateles/code/ateles.js?version=630732
// ==/UserScript==
Ateles(['page_loader'], function (page_loader) {
    page_loader({
        next_page: function (doc) {
            var a_to_next = $(doc).find('.pagination a').filter(function () {
                return this.innerText === '>'
            })[0]
            return a_to_next && a_to_next.href
        },
        append_page: function (data) {
            var $row = $(data).find('.container:last-child .row')
            $row.find('.aw-side-bar').remove()
            $('.container:last-child .row').last().after($row)
        },
        button: function () {
            var $btn = $('<li><a>all</a></li>')
            $('.pagination li:last-child').after($btn)
            return $btn
        }
    })
})