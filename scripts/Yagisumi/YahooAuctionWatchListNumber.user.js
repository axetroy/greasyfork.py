// ==UserScript==
// @name         YahooAuctionWatchListNumber
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  ヤフオクのウォッチリスト数を表示
// @author       Yagi
// @match        https://page.auctions.yahoo.co.jp/jp/auction/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    var wl = window.conf.keys.wl;
    if (wl) {
        $("#l-sub .Count__counts").append("\n            <li class=\"Count__count Count__count--sideLine\" style=\"margin-left: 5px\">\n                <dl>\n                    <dt class=\"Count__title\">\n                        <img src=\"https://s.yimg.jp/images/auc/pc/item/image/1.0.0/bg_star.png\" style=\"height: 14px\">\n                    </dt>\n                    <dd class=\"Count__number\">\n                        " + wl + "\n                    </dd>\n                </dl>\n            </li>");
        $(".Count__count").css("padding", "0 5px");
        $(".Count__watch").css("padding", "0 3px");
    }
})();