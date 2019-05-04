// ==UserScript==
// @name         百度收搜结果屏蔽部分垃圾网站
// @namespace    http://tampermonkey.net/
// @home-url     https://greasyfork.org/zh-CN/scripts/41037
// @description  去掉百度搜索结果部分不要网页，比如那种需要登录才能看答案的如：上学吧，考研资料网
// @version      0.1
// @include      http://www.baidu.com/*
// @include      https://www.baidu.com/*
// @author       babybing666
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var hostname = window.location.hostname;
    if (hostname == 'www.baidu.com') {
        process();
        document.addEventListener("DOMSubtreeModified", process);
    }
    function process() {
        var results = document.getElementsByClassName('result c-container');
        //console.log(results)
        if (results && results.length > 0) {
            for (var i = results.length - 1; i >= 0; i--) {
                var links = results[i].getElementsByClassName('c-showurl');
                if (links && links.length > 0) {
                    var link = links[0];
                    var text = link.innerText;
                    if (text.indexOf('shangxueba') > -1||text.indexOf('ppkao') > -1||text.indexOf('jd') > -1||text.indexOf('taobao') > -1||text.indexOf('tmall') > -1||text.indexOf('etao') > -1||text.indexOf('chinawenben') > -1){
                        results[i].parentNode.removeChild(results[i]);
                    }
                }
            }
        }
    }
})();