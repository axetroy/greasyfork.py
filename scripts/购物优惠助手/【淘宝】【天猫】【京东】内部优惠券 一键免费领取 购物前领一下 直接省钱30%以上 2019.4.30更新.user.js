// ==UserScript==
// @name         【淘宝】【天猫】【京东】内部优惠券 一键免费领取 购物前领一下 直接省钱30%以上 2019.4.30更新
// @namespace    https://jbsou.cn/
// @version      4.0
// @description  一个按钮查找淘宝天猫和京东 内部优惠券，一键免费领取。直接领取优惠券购买。优惠30%以上！
// @author       Timi
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://item.jd.com/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    $(document).ready(function () {
        var host = window.location.host;
        var productNm = '';
        var url = "http://quan.jbsou.cn/index.php?r=searchlist&kwd=";
         var urll = "http://www.jbsou.cn/1111.html";
        var label = "获取优惠券";
        var labell = "性价比瀑布";
        var cssSelector = '';
        if (host.indexOf('taobao.com') > 0) {
            productNm = $.trim($('.tb-main-title').text());
            cssSelector = '.tb-action';
        } else if (host.indexOf('tmall.com') > 0) {
            productNm = $.trim($('.tb-detail-hd h1').text());
            cssSelector = '.tb-action';
        } else if (host.indexOf('jd.com') > 0) {
            productNm = $.trim($('.sku-name').text());
            cssSelector = '#choose-btns';
            url = "http://dong.jbsou.cn/?r=search?kw=";
        }
        $(cssSelector).append(obtainAppendHtml(host, url, productNm, label, urll, labell));
    });

    function obtainAppendHtml(host, url, productNm, label, urll, labell) {
        if (host.indexOf('taobao.com') > 0) {
            return '<div class="div-inline"><div class="tb-btn-buy" style="padding-top:11px;"><a href="' + url + encodeURI(productNm) + '" target="_blank">' + label + '</a></div></div> <div class="div-inline"><div class="tb-btn-add" style="padding-top:11px;"><a href="' + urll + '" target="_blank">' + labell + '</a></div></div>';
        } else if (host.indexOf('tmall.com') > 0) {
            return '<div class="div-inline"><div class="tb-btn-buy tb-btn-sku"  style="padding-top:11px;"><a href="' + url + encodeURI(productNm) + '" target="_blank">' + label + '</a></div></div> <div class="div-inline"><div class="tb-btn-basket tb-btn-sku " style="padding-top:11px;"><a href="' + urll + '" target="_blank">' + labell + '</a></div></div>';
        } else if (host.indexOf('jd.com') > 0) {
            return '<a class="btn-special1 btn-lg" href="' + url + encodeURI(productNm) + '" target="_blank">' + label + '</a>';
        }
    }
})();