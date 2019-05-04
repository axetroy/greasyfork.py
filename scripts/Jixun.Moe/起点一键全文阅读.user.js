// ==UserScript==
// @name         起点一键全文阅读
// @namespace    http://jixun.org/
// @version      1.3.1
// @description  一键「全文阅读」
// @include      *://*qidian.com/Book/*.aspx*
// @include      *://*qdmm.com/mmweb/*.aspx*
// @include      *://*qidian.com/Book/ShowBook.php?bookid=*
// @include      *://down1.qidian.com/bookall/*
// @copyright    2012+, Jixun
// @run-at       document-start
// @grant        none
// ==/UserScript==

// 感谢 @caliban 一直在跟进该脚本 ;w;

addEventListener('DOMContentLoaded', function () {
    if (location.hostname == 'down1.qidian.com') {
        document.body.style.maxWidth = "50rem";
        document.body.style.margin = "1em auto";
        
        var styleFix = document.createElement('style');
        styleFix.textContent = '\
            .nav, .ad, .bkt, .aut, .chat, .list, .at { width: initial; }\
            a { display: inline-block; }\
            .content > a { display: block; }\
            p {word-break: break-all;} \
       ';
        document.body.appendChild(styleFix);
        
        var scriptFix = document.createElement('script');
        scriptFix.textContent = 'with(document)oncontextmenu=onselectstart=null;';
        document.body.appendChild(scriptFix);
    } else {
        /*
         *   a => 原始「点击阅读按钮」的 Li 列表元素
         *   b => 复制后的 Li 元素
         *   c => 用于修改 b 属性的元素
         */
        var a = document.querySelector('div[class="opt"] ul li'),
            b = a.cloneNode(true),
            c = b.querySelector ('a');

        c.textContent = '全文阅读';
        c.href = 'http://down1.qidian.com/bookall/' + document.getElementById('sinazanurl').getAttribute('content').match(/\/(\d+)/)[1] + '.htm';
        c.title = c.title.replace('的章节列表', ' 全文阅读');
        c.removeAttribute ('onclick');
        // c.target = '_blank';
        // 如果需要默认在新窗口开启请取消注释上一行。
        a.parentNode.insertBefore(b, a);
    }
}, false);
