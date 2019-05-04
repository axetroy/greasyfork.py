// ==UserScript==
// @name         自动展开豆瓣读书页面 内容简介 作者简介 目录
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  自动展开豆瓣读书页面 内容简介 作者简介 目录.
// @author       RozwelGustab
// @match        https://book.douban.com/subject/*
// @match        http://book.douban.com/subject/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var reg_short=/^dir_\S*_short$/;
    var reg_full=/^dir_\S*_full$/;
    var all_indent=document.querySelectorAll(".related_info>div.indent");
    for(var i=0;i<all_indent.length;i++){
        var indent=all_indent[i];
        var full=indent.querySelector('.all.hidden');
        var short=indent.querySelector('.short');
        if(full!=null&&short!=null){
            full.style="display:inline";
            short.style="display:none";
            continue;
        }
        if(reg_short.test(indent.id)){
            indent.style="display:none";
            continue;
        }
        if(reg_full.test(indent.id)){
            indent.style="display:inline";
            continue;
        }
    }
})();