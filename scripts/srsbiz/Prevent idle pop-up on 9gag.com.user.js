// ==UserScript==
// @name           Prevent idle pop-up on 9gag.com
// @description    Simulates scroll event to prevent idle pop-up
// @namespace      pl.srsbiz
// @include        https://9gag.com/*
// @grant none
// @version 0.0.1.20180106094706
// ==/UserScript==

jQuery('document').ready(function($){
  window.setInterval(function(){
    $('body').trigger(new $.Event('scroll'));
  }, 160000);
});
