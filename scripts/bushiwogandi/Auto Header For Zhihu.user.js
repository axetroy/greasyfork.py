// ==UserScript==
// @name        Auto Header For Zhihu
// @namespace   org.sorz.lab.zhihu
// @include     https://www.zhihu.com/*
// @version     0.1
// @grant       none
// @description 自动知乎顶栏。
// ==/UserScript==

$(document).ready(function() {
  var $header = $('.zu-top');
  var headerHeight = $header.outerHeight() + 3;
  var headerPos = 0;
  function toHide(){
       headerPos = -headerHeight;
      $header.css('top',-headerHeight+ 'px');
  }
  function toShow(){
       headerPos = 0;
       $header.css('top', '0px');
  }
  $(window).scroll(function() {
      if($(document).scrollTop() < 10){
        toShow();
      }
      else{
        toHide();
      }
  });
});