// ==UserScript==
// @name         iTunes ジャケットいただきまう
// @namespace    http://mizle.net/
// @version      0.1
// @description  ジャケットの下に1200x1200のリンクを追加する。
// @author       eai04191
// @license     MIT
// @match        https://itunes.apple.com/jp/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.1.0.min.js
// ==/UserScript==

(function() {
    'use strict';
    var cover = $(".product .artwork img");
    var coverUrl = cover.attr("src");
    var hiresCoverUrl = coverUrl.replace("cover170x170","cover1200x1200");
    $(cover).after("<a href='"+hiresCoverUrl+"'>"+"Download 1200x1200 cover"+"</a>");
})();