// ==UserScript==
// @name        Acfun文章区美工摸鱼插件
// @version     1.0
// @description Acfun摸鱼插件
// @match       http*://www.acfun.cn/v/list63/index.htm*
// @match       http*://www.acfun.cn/a/ac*

// @author      冲锋
// @require        http://code.jquery.com/jquery-1.4.1.min.js
// @namespace https://greasyfork.org/users/63731
// ==/UserScript==

(function() {
    'use strict';

    console.log("插件启动成功");

    $("#header").remove();
    //$(".a-column-left").remove();
    //$(".ArticleIndexAd").remove();
    //$(".a-column-right").remove();
    // console.log($(".ArticleDelveFieldContent"));
    //console.log($(".ArticleDelveFieldContent").find('.article-delve-image'));
    //$(".ArticleDelveFieldContent").find(".article-delve-image").remove();
    var frame="http://wx1.sinaimg.cn/large/006p6Me7gy1fv94l1er6xg31ao0t50ub.gif";
    var bg="url('http://wx3.sinaimg.cn/large/006p6Me7gy1fv94l21su4j31ao0s2q41.jpg') ";
    var headUrl="http://wx4.sinaimg.cn/large/006p6Me7gy1fv95zh4zwgg31ao03074i.gif";
    var leftUrl="http://wx4.sinaimg.cn/large/006p6Me7gy1fv95zhoy4wg301l0s2mx5.gif";
    var rightUrl="http://wx1.sinaimg.cn/large/006p6Me7gy1fv95zi3m65g309q0s2t90.gif";
    var bottomUrl="http://wx3.sinaimg.cn/large/006p6Me7gy1fv95zgpevrg31ao011jrn.gif";

    var img=$("<img class='zzz' src='"+frame+"'></img>");
    var headImg=$("<img class='zzz' src='"+headUrl+"'></img>");
    var leftImg=$("<img class='zzz' src='"+leftUrl+"'></img>");
    var rightImg=$("<img class='zzz' src='"+rightUrl+"'></img>");
    var bottomImg=$("<img class='zzz' src='"+bottomUrl+"'></img>");

    var div=$("<div></div>")

    var windowWidth=window.screen.width  ;
    var windowHeight=window.screen.height ;
    console.log(windowWidth);
    console.log(windowHeight);


    $(headImg).css({
        width:windowWidth,
        position:"fixed",
        top:0,
        left:0,
    });
     $(leftImg).css({
        position:"fixed",
        top:0,
        left:0,
    });
     $(rightImg).css({
        position:"fixed",
        top:0,
       right:0,
    });
       $(bottomImg).css({
        position:"fixed",
           height:"40px",
        left:0,
           bottom:0,
    });




    $(div).append(headImg);
    $(div).append(leftImg)
    $(div).append(rightImg)
  //  $(div).append(bottomImg)


    $("body").append(div);
    $("body").css("cssText","background:"+bg+"!important");
   // $(".main").attr("id","1")
    $(".main").removeClass("main")
    $("#main").css("cssText","background:url()!important");


    $("boty").removeClass("body")





    // Your code here...







})();