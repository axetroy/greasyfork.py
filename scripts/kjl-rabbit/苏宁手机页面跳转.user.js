// ==UserScript==
// @name         苏宁手机页面跳转
// @namespace    http://tampermonkey.net/
// @description  苏宁手机版商品页面直接跳转到pc页面
// @author       kjl
// @include      *//m.suning.com/*
// @include      *//product.m.suning.com/*
// @version      0.4
// @grant        none
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';
    //直接打开pc端页面
    location.assign("https://product.suning.com/0000000000/"+location.href.toString().match(/\d+.html/g));
})();