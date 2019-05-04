// ==UserScript==
// @name         网页便利店
// @namespace    http://tampermonkey.net/
// @version      0.2.5
// @description  一些网页上的简单处理，使其更适合浏览
// @author       Max Sky
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://*.baidu.com/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var domain = document.domain;
    if (domain.indexOf('baidu.com') > -1) {
        var style = $('#css_newi_result');
        style.html('#content_right{display:none!important}.rrecom-btn,.rrecom-btn-hover{display:none!important}body>style+.result-op,.xpath-log:not(.c-container){display:none!important}'
                   + style.html());
    }
    if (domain.indexOf('csdn.net') > -1) {
        // 移除阅读更多按钮
        $('#btn-readmore').remove();
        // 按照规则添加样式
        $('.hide-article-box.hide-article-pos.text-center').addClass('hide-article-style');
        // 移除限高
        $('.blog-content-box #article_content').removeAttr('style');
    }
})();