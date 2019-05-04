// ==UserScript==
// @name         colg简化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://bbs.colg.cn/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    //更改标题
    $("title").html("hello");

    //$().remove();
    $("#f_pst").remove();
    $("#newspecial").remove();
    $(".drag").remove();
    $("#newspecialtmp").remove();
    $("#hd").remove();
    $(".avatar").remove();
    $(".md_ctrl").remove();
    $(".sign").remove();
    $(".mbn .xw1").remove();
    $(".mbn .xg1").remove();
    $(".pstl a img").remove();
    $(".xg2").nextAll().remove();

    //链接标题文字颜色
    $(".xst").css({
        "color": "black",
        "font-weight": "normal"
    });

    //内容图片
    var showImgBtn = '<div class="showImgBtn">[IMG]</div>';
    $(".savephotop").prepend(showImgBtn);
    $(".showImgBtn").css({
        "cursor": "pointer"
    });
    $(".savephotop img").hide();
    $(".showImgBtn").click(function() {
       $(this).next().toggle();
    });

    function changeTxtImgToString(){
    var showImgBtn = '<text class="showTxtImgBtn">(img)</text>';
    $(".t_f img").before(showImgBtn);
    $(".showTxtImgBtn").css({
        "cursor": "pointer"
    });
    $(".t_f img").hide();
    $(".showTxtImgBtn").click(function() {
       $(this).next().toggle();
    });
    }

    changeTxtImgToString();

    // Your code here...
})();


