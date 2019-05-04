// ==UserScript==
// @name         百度文库点击签到
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  打开百度文库每日任务页面后自动点击每日签到，啊，我是真的懒，浏览器一键打开收藏夹列表，然后脚本全部自动点击签到，哈哈
// @author       wintercee
// @match        https://wenku.baidu.com/task/browse/daily
// @grant        none
// @run-at       document-end
// ==/UserScript==
window.onload=function(){
    console.log("百度签到运行中");
    document.getElementsByClassName('js-signin-btn')[0].click();
};

