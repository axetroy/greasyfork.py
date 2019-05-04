// ==UserScript==
// @name        解除电信劫持
// @namespace   https://greasyfork.org/zh-CN/users/821
// @description 解决电信劫持空白页面问题
// @include     http://*
// @include     https://*
// @version     1
// @grant       none
// @run-at      document-end
// ==/UserScript==

        var a=document.getElementsByTagName('script')[0].innerHTML;
        if(a.indexOf("=iunm?=ifbe?=nfub!obnf")>0){
           window.location.reload();
           console.log("reload done!");
        }
