// ==UserScript==
// @name         淘宝天猫颜色分类图片加上文字显示
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  淘宝天猫宝贝分类图标加上文字显示
// @author       F1024
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js

// ==/UserScript==

$(document).ready(function(){
    $(".J_TSaleProp.tb-img.tb-clearfix li").each(function(){
    $(this).append($("span",this).text());
    });
    
    $(".tm-clear.J_TSaleProp.tb-img li").each(function(){
    $(this).append($("span",this).text());
    });
});