// ==UserScript==
// @name         autoload tumblr post when scroll to the bottom of page for mobile
// @description  当滚动到接近页面底部时直接加载手机版tumblr信息
// @version      0.4
// @include      http://*.tumblr.com/*
// @include      https://*.tumblr.com/*
// @author       yechenyin
// @namespace    https://greasyfork.org/users/3586-yechenyin
// @require  	   https://code.jquery.com/jquery-1.11.2.min.js
// ==/UserScript==

var $window = $(window);
var scroll = function() {
  if ($window.scrollTop() + $window.height() > $('.post').slice(-5,-4).offset().top) {
    console.log('load_more_posts');
    $('#load_more_posts')[0].click();
  }
};

var waiting = false;
$(window).scroll(function () {
    if (waiting) {
        return;
    }
    waiting = true;

    scroll();

    setTimeout(function () {
        waiting = false;
    }, 1000);
});
