// ==UserScript==
// @name           cnblog自动屏蔽flashplayer弹窗
// @author         wusuluren
// @description    自动屏蔽cnblog网站上的提示安装flashplayer的弹窗
// @require        http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @match          *://blog.sina.com.cn/*
// @supportURL     https://github.com/Wusuluren
// @version        0.0.1
// @grant          None
// @namespace https://greasyfork.org/users/194747
// ==/UserScript==
(function () {
    'use strict';
 
    var timer = setInterval(function(){
      var as = $('.CP_w_shut')
      for(var i = 0; i < as.length; i++) {
        if (as[i].onclick) {
            console.log(as[i])
            as[i].click()
            setTimeout(function(){clearInterval(timer)}, 1000)            
        }
      }
    }, 100)
  
})();
