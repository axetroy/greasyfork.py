// ==UserScript==
// @name         苏宁云钻好券兑换助手beta
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  苏宁各种云钻好券兑换助手
// @author       krapnik
// @match        *://yzdh.suning.com/yzdh-web/exchange/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //获取北京时间时间戳
    var voucherId = prompt("voucherId");
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
                $('.time').html('当前服务器时间:'+res.sysTime2);
            }
        });
    },1000);

    function coupon() {
        var url=`https://yzdh.suning.com/yzdh-web/voucher/sendVoucher.do?callback=callbackSendVoucherFun&voucherId=${voucherId}&voucherType=1&couponGetSource=VIP&detect=${encodeURIComponent(bd.rst())}`,
            result =`<iframe width="150" height="150" style="border:1px solid #666666;" src="${url}"></iframe>`;
        $('body').prepend(result);
        postCnt++;
    }

    function exchange(){
        if(n>=startTime&&!flag){
            flag = true;
            clearInterval(t1);
            t3 = window.setInterval(coupon, 500);
        }
        if(postCnt>=6&&flag){
            clearInterval(t2);
            clearInterval(t3);
        }
    }

		t2 = setInterval(exchange,500);
})();