// ==UserScript==
// @name         【csdn, 有用网】全文查看
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  【csdn, 有用网】全文查看：破除 csdn，有用网 需要登录或点一下才能查看的全文
// @include      https://www.youyong.top/article*
// @include      https://blog.csdn.net/*
// @include      https://bbs.csdn.net/topics/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var $content = document.getElementById('content');
    var $showMore = document.querySelectorAll('.show-more-detail') || [];
    var $csdnContent = document.getElementById('article_content');
    var $csdnMask = document.querySelectorAll('.hide-article-box') || [];
    var $csdnBbsCon = document.getElementById('bbs_detail_wrap');
    var $csdnBbsMask = document.querySelectorAll('.hide_topic_box') || [];

    if ($csdnBbsCon) {
        $csdnBbsCon.setAttribute('style', '');
    }

    if ($content) {
        $content.setAttribute('style', '');
    }

    if ($csdnContent) {
        $csdnContent.setAttribute('style', '');
    }

    if ($csdnMask && $csdnMask.length) {
        $csdnMask[0].style.display = 'none';
    }

    if ($csdnBbsMask[0]) {
        $csdnBbsMask[0].style.display = 'none';
    }

    if ($showMore[0]) {
        $showMore[0].style.display = 'none';
    }

})();