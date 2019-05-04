// ==UserScript==
// @name         移除知乎问题页广告和全屏化
// @namespace    http://tampermonkey.net/
// @version      20180804
// @description  会引用jquery3.2.1库,会移除右侧并将问题宽度全屏
// @author       gcud
// @match        https://www.zhihu.com/question/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==
//移除右侧
$('.Question-sideColumn').remove();
//设置全屏
$('.Question-main').width('100%');
$('.Question-main').css('padding','0');
$('.Question-mainColumn').width('100%');
//设置问题标题
$('.QuestionHeader-content').width('90%');
$('.QuestionHeader-main').width('100%');
//注册点击查看全部问题按钮事件,由于有延迟所以用了setTimeout
$('.QuestionMainAction').one('click',setTimeout(function(){
    $('.Question-main').width('100%');
    $('.Question-mainColumn').width('100%');
},1000));