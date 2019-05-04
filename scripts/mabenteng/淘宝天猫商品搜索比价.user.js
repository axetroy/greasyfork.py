// ==UserScript==
// @name         淘宝天猫商品搜索比价
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  搜索淘宝网内同标题商品页面,实乃淘宝天猫购物之神器
// @author       You
// @match        https://item.taobao.com/item.htm*
// @match        https://detail.tmall.com/item.htm*
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(window.location.host=="item.taobao.com"){
    setTimeout(function(){
        var $j = jQuery.noConflict();
        $j(function(){
            var url99="https://s.taobao.com/search?q="+$j("div#J_Title h3").text().replace(/(^\s*)|(\s*$)|(\s)/g,"");
          //console.log(url99);
              $j("div#J_Title p.tb-subtitle").after("<a href="+url99+" target='_blank' style='font-size: xx-large;font-weight: bold;color: red;'>===搜索比价===</a><br/>");


        });


    },500);
}else if(window.location.host=="detail.tmall.com"){

    setTimeout(function(){
        var $j = jQuery.noConflict();
        $j(function(){
            var url99="https://s.taobao.com/search?q="+$j("div.tb-detail-hd h1").text().replace(/(^\s*)|(\s*$)|(\s)/g,"");
          //console.log(url99);
              $j("div.tb-detail-hd h1").after("<a href="+url99+" target='_blank' style='font-size: xx-large;font-weight: bold;color: red;'>===搜索比价===</a><br/>");


        });


    },500);




         }


    // Your code here...
})();