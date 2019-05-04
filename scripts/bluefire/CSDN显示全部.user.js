// ==UserScript==
// @name         CSDN显示全部
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  [CSDN]
// @author       Blue Fire
// @match        *://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function() {
    $(document).ready(function(){
        var article = $('#article_content')
        if(article.css("overflow") == "hidden"){
            article.css("overflow", "auto");
            article.css("height", "auto");
            var hide_box = $('.hide-article-box.text-center');
            hide_box.css("display", "none");
            var artH = article.height();
        }
    });
})();