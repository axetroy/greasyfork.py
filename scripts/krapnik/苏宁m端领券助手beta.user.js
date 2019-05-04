// ==UserScript==
// @name         苏宁m端领券助手beta
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       krapnik
// @match        *://res.m.suning.com/project/quan/dist/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //获取北京时间时间戳
    var timestamp,n,et;
    var st = +prompt("设置开始自动抢券的时间，比如是12月1日10点0分开始的，参考格式：1201095959");
    et=st+2;
    $('.couponUseRule').html('预约领券时间'+st);
    function getTime(){
        $.ajax({
            url: '//quan.suning.com/getSysTime.do',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function (res) {
                timestamp=res.sysTime1;
                n = +timestamp.substring(4);
                $('.orderLimit-stratTime').eq(0).html('当前时间:'+res.sysTime2);
            }
        });
    }
    var t1 = setInterval(getTime,500);

    function getCoupon(){
        if(n>=st&&n<et){
            //领券方法
            $(".action-btn a").trigger('click');
        }
    }
    var t2 = setInterval(getCoupon,500);

})();