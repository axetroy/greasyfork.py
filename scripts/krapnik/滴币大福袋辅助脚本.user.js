// ==UserScript==
// @author            krapnik
// @name              滴币大福袋辅助脚本
// @description       滴币大福袋自动点击辅助脚本
// @include           *://static.udache.com/activity/2017-point-game/*
// @version           0.8
// @connect-src       www.udache.com
// @namespace https://greasyfork.org/users/151668
// ==/UserScript==

(function() {
    'use strict';
//自动点击开始
    setInterval(function(){
      if($('.home').attr('style')=="display: block;"){
          $('*[data-cmd="start-game"]').trigger("touchend");
      }
    },1000);
//85ms自动点击一次
    setInterval(function(){
      $('.play-ctrl').trigger("touchend");
    },85);
//判断是否已经没有游戏机会
    setInterval(function(){
      if($('.result-container').attr('style')=="display: block;"){
          $('.btn-play-again').trigger("click");
      }
      if($('.didi-dialog-p').html()=="你已玩过三次啦，明天再来哟！"||$('.chance-tip').attr('style')=="display: block;"){
        window.location.href="about:blank";
        window.close();
    }
    },1000);
})();