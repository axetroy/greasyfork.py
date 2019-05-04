// ==UserScript==
// @author            krapnik
// @name              京东每日签到助手
// @description       京东会员签到+每日店铺抽奖+金融会员抽奖+京友邦签到+数字游戏签到
// @include           *//bean.jd.com/myJingBean/list/*
// @include           *//mall.jd.com/*
// @include           *//*.jd.com/*
// @include           *//vip.jr.jd.com/
// @version           0.7
// @connect-src       www.jd.com
// @namespace https://greasyfork.org/users/151668
// ==/UserScript==

(function() {
    'use strict';
    if(top.location.hostname=='bean.jd.com'){
        setTimeout(function(){
            window.open("http://vip.jd.com");
        },1000);
        setTimeout(function(){
            window.open("http://vip.jr.jd.com");
        },2000);
        setTimeout(function(){
            window.open("http://huan.jd.com");
        },3000);
        setTimeout(function(){
            window.open("http://you.jd.com/channel/shouji.html");
        },4000);
        var btn = document.getElementsByClassName('s-btn');
        for(var i = 0;i<btn.length;i++){
        (function(i){
            setTimeout(function (){
                btn[i].click();
            },i*3000);
        })(i);
        }
    }
    //每日店铺抽奖
    if(/\w*\.jd\.com/.test(top.location.hostname)&&(top.location.hostname!='bean.jd.com')&&(top.location.hostname!='vip.jd.com')&&(top.location.hostname!='huan.jd.com')&&(top.location.hostname!='you.jd.com')){
        setInterval(function(){
            if(document.getElementsByClassName('unsigned').length>=1){
               document.getElementsByClassName('unsigned')[0].click();
            }else if(document.getElementsByClassName('signed').length>=1){
                window.location.href="about:blank";
                window.close();
            }
        },3000);
        setInterval(function(){
            if(window.location.href.indexOf('shopSign')>=0){
                window.location.href="about:blank";
                window.close();
            }
        },3000);
        //延时未加载页面即刷新
        setTimeout(function(){
            window.location.reload();
        },10000);
    }
    //会员中心每日抽奖
    if(top.location.hostname=='vip.jd.com'){
        setInterval(function(){
            if(document.getElementById('signIn')){
               document.getElementById('signIn').click();
            }
        },1000);
        //关闭弹窗
        setInterval(function(){
            if(document.getElementsByClassName('ui-dialog-close')){
               document.getElementsByClassName('ui-dialog-close')[0].click();
            }
        },2000);
        setInterval(function(){
            if(document.getElementsByClassName('signed').length>=1){
                window.location.href="about:blank";
                window.close();
            }
        },3000);
    }
    //金融会员抽奖
    if(top.location.hostname=='vip.jr.jd.com'){
        //签到
        setInterval(function(){
            if(document.getElementById('index-qian-btn')){
               document.getElementById('index-qian-btn').click();
            }
        },1000);
        //关闭弹窗
        setInterval(function(){
            if(document.getElementsByClassName('close-sign')){
               document.getElementsByClassName('close-sign')[0].click();
            }
        },1000);
        setInterval(function(){
            if(document.getElementsByClassName('qian-text')[0].innerHTML=="已签到"){
                window.location.href="about:blank";
                window.close();
            }
        },1000);
    }
    //数字游戏
    if(top.location.hostname=='huan.jd.com'){
        setTimeout(function(){
            if(document.getElementsByClassName('sign-status').length==0){
               document.getElementById('signin-btn').click();
            };
        },2000);
        setInterval(function(){
            if(document.getElementsByClassName('thickclose').length>0){
                window.location.href="about:blank";
                window.close();
            }
        },2000);
    }
    //京友邦
     if(top.location.hostname=='you.jd.com'){
        setInterval(function(){
            if(document.getElementsByClassName('sidebar_checkin_btn_content').length>=1){
               document.getElementsByClassName('sidebar_checkin_btn_content')[0].click();
            }
        },2000);
        setInterval(function(){
            if(document.getElementById('confirmPunchInfo')){
               document.getElementById('confirmPunchInfo').click();
            }
        },3000);
        setInterval(function(){
            if(document.getElementsByClassName('checked')[0]){
                window.location.href="about:blank";
                window.close();
            }
        },3000);
    }
})();