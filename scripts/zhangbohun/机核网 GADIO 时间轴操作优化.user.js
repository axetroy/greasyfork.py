// ==UserScript==
// @name           机核网 GADIO 时间轴操作优化
// @namespace  http://zhangbohun.github.io/
// @version        0.1
// @description  移除时间轴拖动效果(使时间轴文字说明可以复制)，同时增加时间轴鼠标滚轮控制
// @author         zhangbohun
// @match         *://www.gcores.com/radios/*
// @grant          none
// ==/UserScript==
'use strict';
var fnVoid = function (event) {
    event.stopPropagation();
    return true;
};

window.onload = function () {

    //移除时间轴拖动效果(使时间轴文字可以复制)
    document.querySelector(".swiper-wrapper").addEventListener("mousedown", fnVoid, true);
    document.querySelector(".swiper-wrapper").removeEventListener("mousemove", fnVoid, true);

    //同时增加时间轴鼠标滚轮控制
    $(".swiper-slide textarea").slice(1).each(function () {
        $(this).replaceWith($(this).val());//提前加载图片
    });
    document.querySelector(".swiper-wrapper").addEventListener("mousewheel", function (event) {
        if (event.wheelDelta > 0) {
            $("#j_dot_prev").click();
            $(".swiper-wrapper").css('transition-duration', '0s');
        }
        else {
            $("#j_dot_next").click();
            $(".swiper-wrapper").css('transition-duration', '0s');
        }
        event.preventDefault();//阻止页面滚动
    }, true)
};