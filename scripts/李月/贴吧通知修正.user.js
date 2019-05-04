// ==UserScript==
// @name        贴吧通知修正
// @namespace   yqp@qq.com
// @description 修正百度贴吧通知右上角会出现的多余的“我的通知”提醒，如无此问题请勿使用
// @include        http://tieba.baidu.com/f?kw=*
// @include        http://tieba.baidu.com/f?ie=gbk&kw=*
// @include        http://tieba.baidu.com/f?ie=utf-8&kw=*
// @include        http://tieba.baidu.com/f?tp=0&kw=*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @include        http://tieba.baidu.com/f?kz=*
// @include        http://tieba.baidu.com/p/*
// @require     https://code.jquery.com/jquery-2.2.3.js
// @version     1.1
// @grant       unsafeWindow
// ==/UserScript==
var title1 = $('.u_news_wrap span');
var msg = $('.unread_num.clearfix');
var i = 2;//多余的通知数
window.setTimeout(function()   {  title1.attr("style","display:none !important");         }, 300);
title1.change(function()
    {    
      
      var m = title1.text();
      var x = parseInt(m)-i;
      var n = msg.text();
      var y = parseInt(n)-i;
      if(x==0)
        {
          title1.attr("style","display:none !important");
        }
      else
        {
          title1.attr("style","display:block !important")
        }
      if(y==0)
        {
          msg.attr("style","display:none !important");
          title1.text(x);
        }
    });
window.setTimeout(function()
    {    
      var m = title1.text();
      var x = parseInt(m)-i;
      var n = msg.text();
      var y = parseInt(n)-i;
      if(x==0)
        {
          title1.attr("style","display:none !important");
          msg.attr("style","display:none !important");
        }
      else
        {
          title1.attr("style","display:block !important")
        }
      if(y==0)
        {
          msg.attr("style","display:none !important");
          title1.text(x);
        }
    }, 3500);