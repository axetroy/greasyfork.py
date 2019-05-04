// ==UserScript==
// @author            krapnik
// @name              苏宁签到助手
// @description       苏宁自动签到领云钻&店铺领云钻
// @include           *//sign.suning.com/*
// @include           *//shop.m.suning.com/*
// @version           0.1
// @connect-src       www.suning.com
// @namespace https://greasyfork.org/users/151668
// ==/UserScript==

(function() {
    'use strict';
    //云钻打卡
    if(window.location.href.indexOf('welcome')>=0){
        setTimeout(function(){
            if(document.getElementsByClassName('tp-btn').length>=1){
	        document.getElementsByClassName('tp-btn')[0].click();
        }
        window.open("https://sign.suning.com/sign-web/m/sign/toSupplierActivities.htm");
        },3000);
    }
    //有奖店铺列表
    if(window.location.href.indexOf('toSupplierActivities')>=0){
        setInterval(function(){
            var btn = document.getElementsByClassName('go');
            if(btn.length>=1){
                for(var i = 0;i<btn.length;i++){
                    (function(i){
                        if(btn[i].innerHTML=='去领取'){
                            setTimeout(function (){
                                //btn[i].setAttribute('target','_blank')
                                btn[i].click();
                            },i*3000);
                        }
                    })(i);
                }
            }else if(btn.length==0){
                window.location.href="about:blank";
                window.close();
            }
        },1000);
    }
    //每日店铺抽奖
    if(window.location.href.indexOf('shop')>=0){
        setInterval(function(){
            if(document.getElementsByClassName('btn_punch')){
                document.getElementsByClassName('btn_punch')[0].click();
            }
        },4000);
        setInterval(function(){
            if(document.getElementsByClassName('btn_punch')[0].innerHTML=="今日已打卡"){
                window.location.href='https://sign.suning.com/sign-web/m/sign/toSupplierActivities.htm';
            }
        },4000);
    }
})();