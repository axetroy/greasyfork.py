// ==UserScript==
// @name         YYETS字幕查找
// @namespace    http://tampermonkey.net/
// @version      0.1
// @icon         http://files.zmzjstu.com/images/dibulogo.png
// @description  YYTES网站下载页面添加zimuku直接搜索按钮
// @author       qhq
// @match        http://zmz003.com/*
// ==/UserScript==

(function() {

    var TAB = $("div[id$='-720P']");
    var ITEMS = $(TAB).children(".down-list").children(".item");
    [].forEach.call(ITEMS, function (ITEM) {
        var filename=$(ITEM).children(".title").children("span[class='filename']").attr("data-original-title");
        var title = filename.substr(0,filename.length-4);
        var downlink=$(ITEM).children(".down-links").children();
        var pianyuanBtn = '<li><a class="btn btn-download" href="https://www.zimuku.cn/search?q=' + title + '" target="_blank"><p class="desc">字幕</p></a></li>';
        var btnDownload = $(downlink).parent();
        btnDownload.append(pianyuanBtn);
        //console.log(title);
    });
})();