// ==UserScript==
// @name         csdn自动加载更多
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  自动加载csdn更多的内容并隐藏阅读更多按钮，不需要跳转登录。
// @author       段文康
// @match        http://blog.csdn.net/*/article/details/*
// @match        https://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    /*显示文字内容*/
    function showArticleContent(){
        var article_div = document.getElementById("article_content");
        if(article_div){
            article_div.style.height = "initial";
        }
    }

    /*隐藏加载更多按钮*/
    function hideMoreButton(){
        var btn_readmore = document.getElementsByClassName("hide-article-box");
        if(btn_readmore && btn_readmore.length>0){
            btn_readmore[0].style.display="none";
        }
    }


    setTimeout(function(){
        showArticleContent();
        hideMoreButton();
    },1000);
})();