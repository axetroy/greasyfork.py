// ==UserScript==
// @name         新增VIP视频解析去广告+淘宝、天猫【taobao、tmall】隐藏优惠券,查看买家秀买家晒图+历史价格查询+书签收藏夹工具【vip视频解析+音乐解析收听下载】  2018.12.31
// @namespace    http://so.yyyydh.com/
// @version      3.4
// @description  VIP视频解析去广告【新增优酷、爱奇艺】+查询淘宝、天猫隐藏优惠券，查看买家秀晒图，查询商品历史价格，多平台搜索同类宝贝!附加书签收藏夹工具【优酷、腾讯、爱奇艺等全网视频vip视频在线解析+QQ、酷狗、网易云、虾米、酷我等全网音乐解析收听下载】不会用的请看详情说明。使用优惠券购物,可能给作者带来些许返利
// @author       yyyy
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://detail.tmall.hk/*
// @include      http*://v.youku.com/*
// @include      http*://www.iqiyi.com/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
        var url = window.location.host;
        var name = '';
        var html = '';
        var name2 = '';
        var html2 = '';
        if (url.indexOf('taobao.com') > 0) {
            name = $.trim($('.tb-main-title').text());
            name2 = $.trim($('div[id=J_Pine]').attr('data-itemid'));
            html = '<div class="tb-btn-buy" style="padding-top:10px;"><a href="http://so.yyyydh.com/youhui.php?kw='+ encodeURI(name) + '" target="_blank">领取优惠券</a></div>';
            $('.tb-action').append(html);
            html2 = '<div class="tb-btn-add" style="padding-top:10px;"><a href="http://so.yyyydh.com/xiu.php?kw='+ encodeURI(name2) + '" target="_blank">查看买家秀</a></div>';
            $('.tb-action').append(html2);
            html = '<div class="tb-btn-buy" style="padding-top:10px;"><a href="http://so.yyyydh.com/gouwu.php?kw=' + encodeURI(name) + '" target="_blank">多平台搜索</a></div>';
            $('.tb-action').append(html);
            html2 = '<div class="tb-btn-add" style="padding-top:10px;"><a href="http://so.yyyydh.com/jiage.php?kw='+ encodeURI(name2) + '" target="_blank">历史价格查询</a></div>';
            $('.tb-action').append(html2);
        }
        if (url.indexOf('tmall') > 0)  {
            name = $.trim($('meta[name=keywords]').attr('content'));
            name2 = $.trim($('div[id=LineZing]').attr('itemid'));
            html = '<div class="tb-btn-buy tb-btn-sku"  style="padding-top:10px;"><a href="http://so.yyyydh.com/youhui.php?kw=' + encodeURI(name) + '" target="_blank">领取优惠券</a></div>';
            $('.tb-action').append(html);
            html2 = '<div class="tb-btn-basket tb-btn-sku"  style="padding-top:10px;"><a href="http://so.yyyydh.com/xiu.php?kw=' + encodeURI(name2) + '" target="_blank">查看买家秀</a></div>';
            $('.tb-action').append(html2);
            html = '<div class="tb-btn-buy tb-btn-sku"  style="padding-top:10px;"><a href="http://so.yyyydh.com/gouwu.php?kw=' + encodeURI(name) + '" target="_blank">多平台搜索</a></div>';
            $('.tb-action').append(html);
            html2 = '<div class="tb-btn-basket tb-btn-sku"  style="padding-top:10px;"><a href="http://so.yyyydh.com/jiage.php?kw=' + encodeURI(name2) + '" target="_blank">历史价格查询</a></div>';
            $('.tb-action').append(html2);
        }
        if (url.indexOf('youku.com') > 0) {
            name = $.trim($('meta[name=title]').attr('content'));
            html = '<div class="v-sub-btn v-sub-action"><a href="http://so.yyyydh.com/shipinsou.php?kw='+ encodeURI(name) +'" target="_blank" style="color:#FFFFFF">搜索资源</a></div>';
            $('#module_basic_sub').append(html);
            html2 = '<div class="v-sub-btn v-sub-action"><a href="http://so.yyyydh.com/shipinjiexi.php?kw='+ encodeURI(window.location.href) +'" target="_blank" style="color:#FFFFFF">解析播放</a></div>';
            $('#module_basic_sub').append(html2);
        }
        if (url.indexOf('iqiyi.com') > 0) {
            name = $.trim($('meta[name=irTitle]').attr('content'));
            html = '<div class="basic-txt"><a href="http://so.yyyydh.com/shipinsou.php?kw='+ encodeURI(name) +'" target="_blank" style="color:#FFFFFF">搜索资源</a></div>';
            $('#titleRow').append(html);
            html2 = '<div class="basic-txt"><a href="http://so.yyyydh.com/shipinjiexi.php?kw='+ encodeURI(window.location.href) +'" target="_blank" style="color:#FFFFFF">解析播放</a></div>';
            $('#titleRow').append(html2);
        }
    });
})();