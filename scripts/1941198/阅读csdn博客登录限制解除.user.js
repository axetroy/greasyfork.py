// ==UserScript==
// @name         阅读csdn博客登录限制解除
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @include      http*://*
// @exclude https://pos.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     var b2 = function(){
           window.is_blog = function() { return false};
        window.username = 'test';
        window.csdn = {};
        window.setTimeout("$('div.check-adblock-bg').remove();",2000) ;
        window.setInterval = null;
    //window.setInterval = function(res,tm) { console.log(tm,res)};
        window.csdn.insertcallbackBlock = false;
    }

    //不破坏运行机制方案,一个页面2天内可不登录。
    var b1 = function(){
        window.setTimeout(function(){
             $("#check-adblock-time").text(3600*48)
            $('body').append('<span id="check-adblock-time" style="display:none;">1000</span>');
            $("div.check-adblock-bg").remove();
            $("#check-adblock-time").text(3600*48)
        },1000) ;
    }
    if( location.href.indexOf('csdn.net')!== -1) {
        b2();
        b1();
        console.log('csdn 登录限制解除');
    }
})();