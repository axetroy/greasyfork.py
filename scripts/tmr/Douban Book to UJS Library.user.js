// ==UserScript==
// @name         Douban Book to UJS Library
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  豆瓣读书直达江苏大学图书馆
// @author       tmr(https://tmr.js.org)
// @include      https://book.douban.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let title=document.getElementsByTagName('h1')[0].children[0].innerText;
    let info=document.getElementById('info');
    let liblink=document.createElement('a');
    liblink.href='http://huiwen.ujs.edu.cn:8080/opac/openlink.php?strSearchType=title&match_flag=forward&historyCount=1&strText='+title+'&doctype=ALL&with_ebook=on&displaypg=20&showmode=list&sort=CATA_DATE&orderby=desc&location=ALL';
    liblink.target='_blank';
    liblink.innerText='去江苏大学图书馆搜索';
    info.appendChild(liblink);
})();