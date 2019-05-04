// ==UserScript==
// @name         屏蔽噗噗电影网广告
// @namespace    http://www.pupudy.com/
// @version      2.2
// @description  屏蔽噗噗电影网广告插件
// @author       Long940216
// @match        http*://*.pupudy.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.accounts').hide();
    $('#imgsrc').hide();
    $('marquee').hide();
    $('.bdshare-slide-button').hide();
    $('div.single-strong:nth-of-type(14)').hide();
    $('div:nth-of-type(15)').hide();
    $('.footer').hide();
    $('.asst-post_header.asst').hide();
    $('.sidebar').hide();
    $('.shares').hide();
    $('.clearfix.article-actions').hide();
    $('a[href="javascript:void(0)"]:nth-of-type(1)').hide();
    $('a[href="javascript:void(0)"]:nth-of-type(2)').hide();
})();