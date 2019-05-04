// ==UserScript==
// @name         金十数据去首页广告
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  去除金十数据web版首页广告栏
// @author       917797065@qq.com
// @match        *://*.jin10.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(".l-main_info").hide();
    $(".jin-flash_list").on("change",revieFun());
    // Your code here...
})();
function revieFun(){
    console.log("隐藏广告生效中");
    $("a[href*='v.jin10.com']").parents('.jin-flash_item.J_flash_item').hide();
    $("a[href*='app.jin10.com']").parents('.jin-flash_item.J_flash_item').hide();
    $("a[href*='tv.jin10.com']").parents('.jin-flash_item.J_flash_item').hide();
    $("a[href*='weektalk.jin10.com']").parents('.jin-flash_item.J_flash_item').hide();
    $($(".jin-wdgg_close").parents("div").next()[0]).hide();
}