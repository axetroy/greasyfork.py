// ==UserScript==
// @name         淘宝天猫内部优惠券.现在开始帮您省钱
// @namespace    https://www.ishtq.com
// @version      4.37.5
// @description  淘宝天猫内部优惠券,一件查找优惠券,简单快速
// @author       淘宝天猫内部优惠券
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://s.taobao.com/*
// @include      http*://list.tmall.com/*
// @include      http*://list.tmall.hk/*
// @include      http*://chaoshi.tmall.com/*
// @include      http*://detail.tmall.hk/*
// @include      http*://chaoshi.detail.tmall.com/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==
///////////////////////////////////////////////////////////////////////
(function() {
    'use strict';
    // 淘宝天猫优惠券,一件查找优惠券,简单快速为您省钱!!!.
    $(document).ready(function() {
		var url = window.location.host;
        var itemName = '';//$(document).attr('title');
        var itemId = '';
		if (url == 'item.taobao.com') {
            itemId = $("link[rel=canonical]").attr("href");
            itemId = itemId.split("id=")[1];
            itemName = $('.tb-main-title').attr('data-title');
            var btn_quan_taobao = '<a style="display: inline-block;padding: 6px 9px;margin-bottom: 0;font-size: 16px;font-weight: normal;height:16px;line-height:16px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:2px;color: #fff;background-color: #2e8b57;#2e8b57;margin-left:10px" href="https://www.ishtq.com/?m=search&a=index&k='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">查优惠券</a><a style="display: inline-block;font-size: 20px;font-weight: normal;height:30px;line-height:30px;text-align: " href="https://s.click.taobao.com/Va7o8Bw" target="_blank">5.5大促</a></div>';
            $('.tb-action').append(btn_quan_taobao);
		}else if(url == 'detail.tmall.com'){
            itemId = $("link[rel=canonical]").attr("href");
            itemId = itemId.split("id=")[1];
            itemName = $('meta[name=keywords]').attr('content');
            var btn_quan_tmall =   '<div class="tb-action" style="margin-top:0"><a style="display: inline-block;padding: 6px 9px;margin-bottom: 0;font-size: 16px;font-weight: normal;height:16px;line-height:16px;width:100px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:2px;color: #fff;background-color: #2e8b57;#2e8b57;" href="https://www.ishtq.com/?m=search&a=index&k='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">查优惠券</a><a style="display: inline-block;font-size: 20px;font-weight: normal;height:30px;line-height:30px;text-align: " href="https://s.click.taobao.com/Va7o8Bw" target="_blank">5.5大促</a></div>';
			$('.tb-sku').append(btn_quan_tmall);
        }else if(url == 'chaoshi.detail.tmall.com'){
            itemId = $('a[id=J_AddFavorite]').attr('data-aldurl')
            itemId = itemId.split("itemId=")[1]
            itemName = $('input[name=title]').attr('value');
            var btn_chaoshi_tmall = '<div class="tb-action tb-btn-add tb-btn-sku"><a style="display: inline-block;padding: 6px 9px;margin-bottom: 0;font-size: 16px;font-weight: normal;height:16px;line-height:16px;width:100px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:5px;color: #fff;background-color: #2e8b57;#2e8b57;"href="https://www.ishtq.com/?m=search&a=index&k='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">查优惠券</a><a style="display: inline-block;padding: 6px 9px;margin-bottom: 0;font-size: 16px;font-weight: normal;height:16px;line-height:16px;width:100px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:5px;color: #fff;background-color: #2e8b57;#2e8b57; " href="https://s.click.taobao.com/Va7o8Bw" target="_blank">5.5大促</a></div>';
            $('.tb-sku').append(btn_chaoshi_tmall);
        }else if(url == 'detail.tmall.hk'){
            itemId = $("link[rel=canonical]").attr("href");
            itemId = itemId.split("id=")[1];
            itemName = $('meta[name=keywords]').attr('content');
            var btn_tmall_hk =   '<div class="tb-action" style="margin-top:0"><a style="display: inline-block;padding: 6px 9px;margin-bottom: 0;font-size: 16px;font-weight: normal;height:16px;line-height:16px;width:100px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:2px;color: #fff;background-color: #2e8b57;#2e8b57;" href="https://www.ishtq.com/?m=search&a=index&k='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">查优惠券</a><a style="display: inline-block;font-size: 20px;font-weight: normal;height:30px;line-height:30px;text-align: " href="https://s.click.taobao.com/Va7o8Bw" target="_blank">5.5大促</a></div>';
			$('.tb-sku').append(btn_tmall_hk);
        }
    });
})();