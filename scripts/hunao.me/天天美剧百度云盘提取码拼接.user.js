// ==UserScript==
// @name         天天美剧百度云盘提取码拼接
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动拼接提取码至百度云链接后面
// @author       hunao.me
// @match        http://www.ttmeiju.vip/meiju/*
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js

// ==/UserScript==

(function() {
    'use strict';

    $('td[ectype=linklist][align=left] a[title="百度云盘下载"]').each(function(){
        var tqm = $(this).parent().next().next().html();
        $(this).attr("href",$(this).attr("href")+"#"+tqm);
    });
})();