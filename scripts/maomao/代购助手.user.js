// ==UserScript==
// @name         代购助手
// @version      2018.04.02
// @description # 禁止代购电脑进入淘宝,京东支付页面
// @author       mao
// @match        *://buy.tmall.com/*
// @match        *://buy.taobao.com/*
// @match        *://trade.jd.com/*
// @require      https://code.jquery.com/jquery-latest.js
// @run-at       document-start
// @namespace undefined
// ==/UserScript==

$( function() {
    alert("请加入购物车后,到收银台结账")
    history.go(-1)
} )