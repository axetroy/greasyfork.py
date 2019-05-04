// ==UserScript==
// @name         EX煎蛋
// @namespace    https://greasyfork.org/zh-CN/scripts/34894
// @version      0.2
// @description  煎蛋直接显示原图
// @author       dazzulay
// @include      http*://jandan.net*
// @grant        none
// ==/UserScript==

$(function(){
    $('a.view_img_link').each(function(){
        var $this = $(this);
       $this.nextAll('img').eq(0).attr('src',$this.attr('href'));
    });
});