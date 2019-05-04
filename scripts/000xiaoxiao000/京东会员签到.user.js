// ==UserScript==
// @name         京东会员签到
// @version      20170823
// @grant        none
// @description  进入京东vip页面，模拟点击会员签到，领取京豆
// @namespace https://greasyfork.org/zh-CN/users/150110-000xiaoxiao000
// @include      *//vip.jd.com/*
// ==/UserScript==
var list_checkin_ready = document.getElementsByClassName("item checkin    checkin-ready")[0];
list_checkin_ready.getElementsByClassName("icon-set")[0].click();  