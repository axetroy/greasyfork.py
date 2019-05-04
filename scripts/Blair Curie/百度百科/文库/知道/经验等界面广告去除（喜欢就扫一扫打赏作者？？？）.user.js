// ==UserScript==
// @name         百度百科/文库/知道/经验等界面广告去除（喜欢就扫一扫打赏作者？？？）
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  remove baidu ads
// @author       babybing666
// @match        *://baike.baidu.com/*
// @match        *://jingyan.baidu.com/*
// @match        *://zhidao.baidu.com/*
// @match        *://wenku.baidu.com/*
// @grant        none
// ==/UserScript==
var timeout = 1500;
(function() {
    'use strict';
    var currentURL = window.location.href;
    var baike = /baike/;
    var jingyan = /jingyan/;
    var zhidao = /zhidao/;
    var wenku = /wenku/;
    if(baike.test(currentURL)){
        setTimeout(function () {
            document.getElementsByClassName("side-content")[0].remove();
            document.getElementsByClassName("topA")[0].remove();
            //document.getElementById("side_box_unionAd").remove();
            document.getElementsByClassName("right-ad")[0].remove();
            console.log("removed");
        }, timeout);
    } else if (jingyan.test(currentURL)){
        setTimeout(function () {
            document.getElementsByClassName("main-aside")[0].remove();
            console.log("removed");
        }, timeout);
    } else if (zhidao.test(currentURL)){
        setTimeout(function () {
            document.getElementsByClassName("qb-side")[0].remove();
            document.getElementsByClassName("text-chain-title")[0].remove();
            document.getElementsByClassName("text-chain-content")[0].remove();
            document.getElementsByClassName("last line")[0].remove();
            document.getElementsByClassName("adTopImg")[0].remove();
            document.getElementsByClassName("EC_ads_listborder")[0].remove();
            console.log("removed");
        }, timeout);
    } else if (wenku.test(currentURL)){
        setTimeout(function () {
            document.getElementsByClassName("search-aside-adWrap")[0].remove();
            document.getElementsByClassName("search-aside-newadWrap")[0].remove();
            document.getElementsByClassName("yuedu-recommend-wrap")[0].remove();
            document.getElementById("fengchaoad").remove();
            document.getElementById("lastcell-dialog").remove();
            console.log("removed");
        }, timeout);
    }
})();