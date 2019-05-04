// ==UserScript==
// @name         CSDN干掉广告
// @namespace       [url=mailto:772332013@qq.com]772332013@qq.com[/url]
// @version      1.0.0
// @description  干掉广告
// @author       MO
// @create          2018-08-22
// @match        *://blog.csdn.net/*
// @run-at       document-end
// @grant           GM_addStyle
// ==/UserScript==

(function(doc) {
    'use strict';
    var lists = [
        '.fourth_column',
        '#asideProfile ~ *',
        '.pulllog-box',
        '[id^="dmp_ad"]',
        '.recommend-ad-box',
        '.recommend-download-box',
        '.recommend-fixed-box div.right-item',
        '[class^="p4courset3"]',
        'a[href^="https://download.csdn.net"]',
        'a[href^="http://union.dangdang.com"]',
        '.hide-article-box',
        '.btn-remove',
        '.btn-remove ~ *',
        '._360_interactive ',
        '.hidden'
    ],
    spac = [
        'a[href^="https://download.csdn.net"],a[href^="http://union.dangdang.com"]{display:none!important}',
        '#article_content,.article_content.tracking-ad{height:auto!important}'
    ]

    document.body.insertAdjacentHTML('beforeEnd', '<style>'+ lists.join(',') +'{opacity:0!important;pointer-events:none!important}'+spac.join('')+'</style>')


})(document);