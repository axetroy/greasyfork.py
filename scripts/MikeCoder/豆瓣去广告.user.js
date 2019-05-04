// ==UserScript==
// @name  豆瓣去广告
// @namespace  mike.douban
// @include *://douban.com
// @include *://www.douban.com/*
// @description:zh-cn 去除豆瓣广播页面的广告
// @version 0.0.1.20171008084242
// @description 去除豆瓣广播页面的广告
// ==/UserScript==

var statuss = document.getElementsByClassName("new-status");
var num = 0;
//console.log(statuss.length);
for (var idx = 0; idx < statuss.length; idx++) {
//    console.log((statuss[idx].attributes["data-uid"]));
    if (statuss[idx].attributes["data-uid"].nodeValue == "None") {
        statuss[idx].remove();
        num++;
//        console.log(statuss[idx]);
    }
}

console.log("remove " + num + " ads.");