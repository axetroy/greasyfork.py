
// ==UserScript==
// @name         【九块九包邮】【淘宝】【天猫】内部优惠券 一键免费领取
// @namespace    http://www.bazhepu.com/
// @version      2.2
// @description  一键免费领取天猫淘宝优惠券，九块九包邮,直接领取优惠券购买
// @author       bazhepu
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    $(document).ready(function () {
        var host = window.location.host;
        var productNm = '';
        var url = "http://www.bazhepu.com/?m=search&a=index&k=";
         var urll = "http://www.bazhepu.com/jiu/index.html";
        var label = "获取优惠券";
        var labell = "九块九包邮";
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