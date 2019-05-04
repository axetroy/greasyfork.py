// ==UserScript==
// @name         CSDN 免登陆查看全文内容
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  免登陆查看全文内容
// @author       Ex1t
// @match        http://blog.csdn.net/*/article/details/*
// @match        https://blog.csdn.net/*/article/details/*
// ==/UserScript==

(function() {
    'use strict'
    var rm=document.getElementById("btn-readmore")
    if(rm){
        rm.parentNode.remove()
        document.getElementById('article_content').style='auto'
        document.getElementsByClassName('pulllog-box')[0].remove()
        setTimeout("document.getElementsByClassName('adblock')[0].remove()",1)
    }
})();