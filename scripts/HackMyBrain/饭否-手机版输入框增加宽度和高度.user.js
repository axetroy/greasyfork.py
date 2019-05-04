// ==UserScript==
// @name 饭否-手机版输入框增加宽度和高度
// @version 0.5
// @author HackMyBrain
// @description m.fanfou.com 输入框宽度自适应,增加高度
// @include http://m.fanfou.com/*
// @namespace https://greasyfork.org/users/2844
// ==/UserScript==


(function (){
    var textarea = document.getElementsByTagName("textarea")[0];
    if ( ! textarea ) return;
    textarea.style.width = "95%";
    textarea.style.height = "6em";
    textarea.style.padding = "2px 0px";
    textarea.style.margin = "auto";
})();