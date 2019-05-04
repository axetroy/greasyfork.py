// ==UserScript==
// @name        5ch_ng_honbun2
// @namespace   http://catherine.v0cyc1pp.com/5ch_ng_honbun2.user.js
// @include     http://*.5ch.net/*
// @include     https://*.5ch.net/*
// @include     http://*.bbspink.com/*
// @include     https://*.bbspink.com/*
// @author      greg10
// @run-at      document-end
// @license     GPL 3.0
// @version     2.0
// @grant       none
// @description ５ちゃんねるの本文をNGワードで消す。
// ==/UserScript==


//================================
// Configurations
//   - NGワードを指定してください。
var g_nglist = [
    "見たくない言葉",
    "見たくない言葉２",
    "見たくない言葉３",
];
//================================



console.log("5ch_ng_honbun start");

// 本文は二種ある
//スレッドページからの本文削除
function honbun_post() {
    document.querySelectorAll("div.post").forEach(function(elem) {
        var str = elem.innerText;
        if (str == null || str == undefined) {
            str = "";
        }
        for (var i = 0; i < g_nglist.length; ++i) {
            var ngword = g_nglist[i];
            if (ngword == "") {
                continue;
            }
            var obj = new RegExp(ngword, "i");
            var index = str.search(obj);
            if (index != -1) {
                elem.nextElementSibling.remove();
                elem.remove();
            }
        }
    });
}

//板トップdl.threadからの本文削除
function honbun_thread() {
    document.querySelectorAll("dl.thread > dd").forEach(function(elem) {
        var str = elem.innerText;
        if (str == null || str == undefined) {
            str = "";
        }
        for (var i = 0; i < g_nglist.length; ++i) {
            var ngword = g_nglist[i];
            if (ngword == "") {
                continue;
            }
            var obj = new RegExp(ngword, "i");
            var index = str.search(obj);
            if (index != -1) {
                elem.previousElementSibling.remove();
                elem.remove();
            }
        }
    });
}

function main() {
    honbun_post();
    honbun_thread();
}


main();