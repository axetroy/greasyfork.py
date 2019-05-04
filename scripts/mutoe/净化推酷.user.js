// ==UserScript==
// @name         净化推酷
// @namespace    mutoe
// @version      0.1
// @description  净化推酷(tuicool.com)文章页
// @author       mutoe
// @include      *://www.tuicool.com/articles/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');
    style.type = 'text/css';
    var html = '.container-fluid {width: 960px;margin-top: 64px;}.article_detail_bg {width: 100% !important;}';

    var hiddenClass = '.article_right_side,.footer,.comments,#kan_articles,#site_articles,.article_social,.navbar-fixed-top';
    if (hiddenClass !== '') html += hiddenClass+' {display: none !important;}';

    style.innerHTML = html;
    document.head.appendChild(style);

})();