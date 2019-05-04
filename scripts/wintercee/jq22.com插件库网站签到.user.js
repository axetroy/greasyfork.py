// ==UserScript==
// @name         jq22.com插件库网站签到
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  打开jq22插件库网签到页面后自动点击每日签到，啊，我是真的懒，浏览器一键打开收藏夹列表，然后脚本全部自动点击签到，哈哈
// @author       wintercee
// @match        *www.jq22.com/myhome
// @grant        none
// @run-at       document-end
// ==/UserScript==
window.onload=function(){
    console.log(" JQ插件库网站签到运行中");
    document.getElementsByTagName('iframe')[1].contentWindow.document.getElementsByClassName('btn-success')[0].click();
};