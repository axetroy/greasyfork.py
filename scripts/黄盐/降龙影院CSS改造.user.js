// ==UserScript==
// @name         降龙影院CSS改造
// @namespace    https://greasyfork.org/zh-CN/users/104201
// @version      0.1
// @description  对降龙影院CSS进行小调整,观看更舒适
// @author       黄盐
// @match        http://xlyy100.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
GM_addStyle(`
.topall{position:absolute !important;}/*导航栏*/
div.ershiba{display:none !important;}/*淘宝天猫优惠券图片*/
div.wrap {padding-top:0px !important;}/*播放框上拉*/
`);
    // Your code here...
})();