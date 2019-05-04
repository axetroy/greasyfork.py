// ==UserScript==
// @name         博客园随笔详情页，随笔标题后显示底部信息
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  博客园随笔详情，将文章内容底部信息复制显示到文章详情的标题下面,参考了 http://chromecj.com/web-development/2018-07/1468.html
// @author       wakasann
// @grant        none
// @include     https://www.cnblogs.com/*/p/*
// @match https://www.cnblogs.com/*/p/*
// @require https://cdn.bootcss.com/jquery/2.2.1/jquery.min.js
// ==/UserScript==


(function() {
    'use strict';
    jQuery(function($){
      setTimeout(function(){
	      // post detail copy the post info after the post title
	      if($("#post_detail").length > 0 && $(".postDesc").length <= 1){
	        $("#post_detail .post .postTitle").eq(0).append("<div class='clear'></div>").after($("#post_detail .post .postDesc").clone());
	      }
      },500);
    });
})();