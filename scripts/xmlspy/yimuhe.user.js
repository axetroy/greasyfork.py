// ==UserScript==
// @name         yimuhe
// @namespace    https://greasyfork.org/zh-CN/scripts/38740-yimuhe
// @version      0.9.6
// @description  1.hilight yimuhe download links in javlib website. 2.delete torrentkitty.tv ad
// @author       You
// @include      http://*.javlib.com/*
// @include      http:/*.p26y.com/*
// @include      http:/*.u29k.com/*
// @include      http*:/*.torrentkitty.*/*
// @include      http://*.d28k.com/*
// @include      http://*.v27f.com/*

// @grant        none
// @run-at document-end
// ==/UserScript==



(function () {
    var hostname = window.location.hostname;
    //1
    var pattern=new RegExp("v27f|d28k.com|u29k.com|javlib.com");
    if(pattern.test(hostname)){
        $.each($("a[href^='redirect.php?url']"),function(index,a){
            var host = location.host;
            a.href = decodeURIComponent(a.href.replace("http://"+host+"/cn/redirect.php?url=",""));
            a.text = a.text + "    " + a.href + "      ";
            if(a.href.includes("yimuhe")){
                $(a).parentsUntil("tr").closest('.t').css('background-color', '#6B6C83');
                a.style='font-size:50px;';
            }else{
                a.style='font-size:20px;';
            }
        });
        return;
    }
    //2
    if(hostname.indexOf('torrentkitty')!=-1){
        //破坏它的脚本变量引用. 原先l8l1X变量是引用window,然后给加定时器,不停地添加页面的mousedown事件,导致鼠标点击任何地方都会跳转到广告页面.
        window.l8l1X=1;
        return;
    }
}) ();