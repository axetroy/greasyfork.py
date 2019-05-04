// ==UserScript==
// @name         turing-all-articles
// @namespace    https://github.com/turnon/turing_all_articles
// @version      0.0.1
// @description  turing_all_articles
// @author       block24block@gmail.com
// @match        http://www.ituring.com.cn/article*
// @grant        none
// @require https://greasyfork.org/scripts/372188-ateles/code/ateles.js?version=630732
// ==/UserScript==
Ateles(["page_loader"], function (page_loader) {
    var base_url = $(".PagedList-skipToNext a")[0].href.replace(/\d$/, "");

    function button(text) {
        return function () {
            var $btn = $('<li class="PagedList-skipToNext"><a>' + text + "</a></li>");
            $(".PagedList-skipToNext").last().after($btn);
            return $btn;
        };
    }

    var common = {
        interval: function () {
            return 2000;
        },
        start_page: function () {
            return 1;
        },
        next_page: function (n) {
            return base_url + n;
        },
        append_page: function (data) {
            var $row = $(data).find(".row");
            $row.find(".side").remove();
            $(".row").last().after($row);
        }
    };

    var specials = [{
            page_count: function () {
                return 10;
            },
            button: button("下十页")
        },
        {
            page_count: function () {
                return 50;
            },
            button: button("下五十页")
        },
        {
            page_count: function () {
                return parseInt($(".PagedList-skipToLast").text());
            },
            button: button("所有页")
        }
    ];

    specials.forEach(function (spefial) {
        var cfg = Object.assign({}, common, spefial);
        page_loader(cfg);
    });
});