// ==UserScript==
// @name         微博 手机版跳电脑板
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       zcf0508
// @match        https://m.weibo.cn/status/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';



    // Your code here...

    window.onload=function(){


        var uid=$render_data.status.user.id;
        var bid=$render_data.status.bid;


        window.location.href="https://weibo.com/"+uid+"/"+bid;

    }



})();