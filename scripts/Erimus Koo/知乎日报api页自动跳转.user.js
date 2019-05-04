// ==UserScript==
// @name         知乎日报api页自动跳转
// @version      0.2
// @description  从rss得到的知乎日报是json格式的，这个脚本帮助直接跳转到H5页面。
// @author       Erimus
// @match        *news-at.zhihu.com/*
// @grant        none
// @namespace http://erimus.cc/
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var url = window.location.href;
    var elements = url.split("/");
    var id = elements[elements.length-1];
    window.location="http://daily.zhihu.com/story/"+id;
})();