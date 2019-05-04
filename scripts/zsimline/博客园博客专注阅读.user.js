// ==UserScript==
// @name         博客园博客专注阅读
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  优化博客园阅读体验
// @author       By SimLine
// @match        https://www.cnblogs.com/*/p/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function $(Ecld) {
        var barblock = document.getElementById(Ecld);
        if (barblock) {
            barblock.parentNode.removeChild(barblock);
        }
    }

    function _(Eclass) {
        var barblock = document.getElementsByClassName(Eclass);
        if (barblock[0]) {
            barblock[0].parentNode.removeChild(barblock[0]);
        }
    }

    /* 删除顶部栏 */
    $('header');
    $('mylinks')
    $('mytopmenu');
    $('banner');

    /* 删除底部栏 */
    $('footer');
    _('footer');

    /* 删除侧边栏 */
    $('sideBar');
    $('leftmenu');
    $('leftcontent');
    $('rightmenu');
    $('right')

    /* 删除博客状态栏 */
    _('postDesc');
    _('postfoot');

    /* 删除广告栏 */
    $('comment_form');

    /* 删除评论栏 */
    $('blog-comments-placeholder');

    /* 删除博客信息栏 */
    $('blog_post_info_block');


    /* 阅读区适配屏幕 */ 
    var home = document.getElementById('home');
    if (home) {
        home.style.margin = '0px';
        home.style.width = '100%';
    }

    var main = document.getElementById('main');
    if (main) {
        main.style.margin = '0px';
        main.style.width = '100%';
    }

    var mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.margin = '0px';
        mainContent.style.width = '100%';
    }


    var centercontent = document.getElementById('centercontent');
    if (centercontent) {
        centercontent.style.margin = '0px';
        centercontent.style.width = '100%';
    }

    var content = document.getElementById('content');
    if (content) {
        content.style.margin = '0px';
        content.style.width = '100%';
    }

    var forFlow = document.getElementsByClassName('forFlow');
    if(forFlow[0]){
        forFlow[0].style.margin = '0px';
        forFlow[0].style.width = '100%';
    }

})();