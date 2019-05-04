// ==UserScript==
// @name         百度云跳转到文件
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  跳转到文件所在位置
// @author       kiki
// @match        https://pan.baidu.com/disk/home*
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    $('[data-button-id="b33"]').parent().append("<span class='g-button'><span class='g-button-right' id='jump'>跳转</span></span>");
    $('#jump').on("click",function(){
        var top = $(".dir-small:last").offset().top;
        if(top>600 || top<0){
            $(".dir-small").parent().parent().parent().animate({
                scrollTop: top-$(".dir-small:first").offset().top+90
            }, 500);
        }else if(top<600 && top>0){
            $(".dir-small").parent().parent().parent().animate({
                scrollTop:  $(".dir-small:first").offset().top
            }, 500);
        }
    });
})();