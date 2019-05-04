// ==UserScript==
// @name         CSDN 阅读优化
// @namespace    https://starudream.cn
// @version      1.0.0
// @description  CSDN 阅读优化，关闭侧边栏和广告
// @author       StarUDream
// @match        *://blog.csdn.net/*/article/details/*
// @grant        none
// @icon         https://csdnimg.cn/public/favicon.ico
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';

    $('aside').remove();
    $('#csdn-toolbar').remove();
    $('#reportContent').remove();
    $('.pulllog-box').remove();
    $('.recommend-right').remove();
    $('.tool-box').remove();
    $('.fourth_column').remove();
    $('.hide-article-box').remove();
    $('.comment-box').remove();
    $('.recommend-box').remove();
    $('.article-copyright').remove();

    $('main').css('width', '100%');
    $('#article_content').css('height', '100%');
})();
