// ==UserScript==
// @name         谷歌翻译去回车
// @version      1.2
// @include      https://translate.google.cn/*
// @description  谷歌翻译去回车，另接脚本定制和小程序
// @author       单曲循环
// @grant        none
// @copyright    2017+, @单曲循环
// @联系QQ        1454781423
// @namespace https://greasyfork.org/users/106373
// ==/UserScript==
var txt = document.getElementById("source");
txt.setAttribute("wrap","off");
document.getElementById("gt-submit").onclick=function (){txt.innerHTML = ReplaceSeperator(txt.innerHTML);};
function ReplaceSeperator(mobiles) {
    var i;
    var result = "";
    var c;
    for (i = 0; i < mobiles.length; i++) {
        c = mobiles.substr(i, 1);
        if (c == "\n")
            result = result + " ";
        else if (c != "\r")
            result = result + c;
    }
    return result;
}