// ==UserScript==
// @name         哔哩哔哩bilibili默认关闭弹幕
// @description  Bilibili html5播放器默认关闭弹幕
// @author      wly5556
// @version 1.0
// @namespace wly5556
// @match        *://*.bilibili.com/video/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    var t = setInterval(function(){
        document.querySelector(".icon-24danmuon").click();
        if(document.querySelector(".icon-24danmuon") != null)
            clearInterval(t);
    },300);
})();