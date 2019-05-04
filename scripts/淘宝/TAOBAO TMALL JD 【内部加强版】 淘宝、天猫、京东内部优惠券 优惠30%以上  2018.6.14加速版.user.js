// ==UserScript==
// @name         TAOBAO TMALL JD 【内部加强版】 淘宝、天猫、京东内部优惠券 优惠30%以上  2018.6.14加速版 
// @namespace    https://www.49zhe.com/
// @version      6.14
// @description  通过淘宝客返利网站，查询商家设置的隐藏优惠券，上万款内部优惠券等你免费领取、让您享受更多优惠!
// @author       Taobao
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://item.jd.com/* 
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
        var url = window.location.host;
        var name = '';
        var html = '';
        if (url.indexOf('taobao.com') > 0) {
            name = $.trim($('.tb-main-title').text());
            html = '<div class="tb-btn-add" style="padding-top:10px;"><a href="http://49zhe.com/index.php?m=quan&a=sok&type=2&kwd='+ encodeURI(name) + '">领取优惠券</a></div>';
            $('.tb-action').append(html);
        } 
        if (url.indexOf('tmall.com') > 0)  {
            name = $.trim($('meta[name=keywords]').attr('content'));
            html = '<div class="tb-btn-basket tb-btn-sku"  style="padding-top:10px;"><a href="http://49zhe.com/index.php?m=quan&a=sok&type=2&kwd=' + encodeURI(name) + '">领取优惠券</a></div>';
            $('.tb-action').append(html);
        }
        
         if (url.indexOf('jd.com') > 0) {
            var name = $.trim($('.sku-name').text());
            var html = '<a href="http://youhui.49zhe.com/?ah=total&kw='+ encodeURI(name) +'" target="_blank"  class="btn-special1 btn-lg">领取优惠券</a>';
            $('#choose-btns').append(html);
        }
    });
})();