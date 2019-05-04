// ==UserScript==
// @name         苏宁领券助手beta
// @namespace    http://tampermonkey.net/
// @version      0.7.2
// @description  苏宁领券助手
// @author       krapnik
// @match        *://quan.suning.com/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //获取北京时间时间戳
    var startTime = + prompt("开始时间(格式：095959)");
    var timestamp,n,t1,t2,t3,postCnt=0,flag = false;
        t1 = setInterval(function (){
        $.ajax({
            url: '//quan.suning.com/getSysTime.do',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function (res) {
                timestamp=res.sysTime1;
                n = Number(timestamp.substring(8));
                $('.shop-name').html(`当前服务器时间:${res.sysTime2}`);
            }
        });
    },1000);


    function exchange(){
        if(n>=startTime&&!flag){
            flag = true;
            clearInterval(t1);
            t3 = window.setInterval(receiveCoupon(independenceActId ,independenceActKey ,'3','10005'), 500);
        }
        if(postCnt>=6&&flag){
            clearInterval(t2);
            clearInterval(t3);
        }
    }

        t2 = setInterval(exchange,500);

})();