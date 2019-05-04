// ==UserScript==
// @name         知网下载助手
// @namespace    wyn665817@163.com
// @version      1.2.0
// @description  论文搜索结果页面和硕博论文详述页面的caj格式下载链接替换为pdf格式下载链接
// @author       wyn665817
// @match        *://*.cnki.net/*
// @include      *://*.cnki.net.*
// @include      *://*/cnki.net/*
// @run-at       document-end
// @grant        unsafeWindow
// @supportURL   https://greasyfork.org/zh-CN/scripts/371938/feedback
// @license      MIT
// ==/UserScript==

var $ = unsafeWindow.$,
url = location.pathname;

String.prototype.dbcode = function() {
    return this.match(/dbcode=C[DM]FD&/i);
};
String.prototype.dflag = function() {
    return this.replace('&dflag=nhdown', '&dflag=pdfdown');
};
String.prototype.kcms = function() {
    return this.replace('kns', 'gb.oversea').replace('kns', 'kcms');
};

if (url.match(/brief\.aspx$/)) {
    $('.GridTableContent tr[bgcolor]').each(function() {
        var $dl = $('.briefDl_Y, .briefDl_D', this),
        href = $dl[0].href;
        href = href.match('&dflag') ? href.dflag() : (href + '&dflag=pdfdown');
        href = $('.fz14', this).attr('href').dbcode() ? href.kcms() : href;
        $dl.attr('href', href);
    });
} else if (url.match(/detail\.aspx$/) && location.search.dbcode()) {
    $('.dllink > .icon').each(function() {
        var tip = $(this).text().trim();
        if (tip == '整本下载') {
            this.href = this.href.dflag().kcms();
        } else if (tip.match(/^分[页章]下载$/)) {
            this.href += '&cflag=pdf';
        }
    });
}