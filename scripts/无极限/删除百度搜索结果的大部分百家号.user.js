// ==UserScript==
// @name         删除百度搜索结果的大部分百家号
// @description  删除百度搜索结果的大部分百家号结果
// @namespace https://greasyfork.org/users/91873
// @version      0.0.0.3
// @include      http://www.baidu.com/*
// @include      https://www.baidu.com/*
// @require       http://code.jquery.com/jquery-3.3.1.min.js
// @author       wujixian
// @note         2019.01.25 新建
// @run-at       document-end

// ==/UserScript==
(function() {
    'use strict';

    $(document).on('DOMSubtreeModified', process);

    function process() {
        var hostname = window.location.hostname;
        // 百度搜索结果
        var results = document.getElementsByClassName('result c-container');
        if (results && results.length > 0) {
            for (var i = results.length - 1; i >= 0; i--) {
                var links = results[i].getElementsByClassName('c-showurl');
                if (links && links.length > 0) {
                    var link = links[0];
                    var text = link.innerText;
                    var imgs = link.getElementsByClassName('source-icon');
                    if (text && text.indexOf('baijia') > -1 || imgs.length > 0){
                        results[i].parentNode.removeChild(results[i]);
                    }
                }
            }
        }
        // 百度最新相关信息
        results = document.getElementsByClassName('result-op c-container xpath-log');
        if (results && results.length > 0) {
            for (var j = results.length - 1; j >= 0; j--) {
                var links2 = results[j].getElementsByClassName('t');
                if (links2 && links2.length > 0) {
                    var link2=links2[0]
                    var text2=link2.innerText
                    var reg = RegExp(/的最新相关信息/);
                    if(reg.exec(text2)){
                        results[j].parentNode.removeChild(results[j]);
                    }
                }
            }
        }
        // 百度资讯
        if (window.location.href.indexOf('&tn=news') != -1) {
            results = document.getElementsByClassName('c-title');
            for (i = results.length - 1; i >= 0; i--) {
                var a = results[i].getElementsByTagName('a');
                if (a && a.length > 0 && a[0].getAttribute('href').indexOf('baijia') != -1) {
                    results[i].parentNode.parentNode.removeChild(results[i].parentNode);
                }
            }
        }
    }
})();