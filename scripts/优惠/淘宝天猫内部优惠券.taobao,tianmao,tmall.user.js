// ==UserScript==
// @name         淘宝天猫内部优惠券.taobao,tianmao,tmall
// @namespace    淘宝天猫内部优惠券.taobao,tianmao,tmall
// @version      3.30
// @description  淘宝天猫内部优惠券
// @author       淘宝天猫内部优惠券
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://s.taobao.com/*
// @include      http*://list.tmall.com/*
// @include      http*://list.tmall.hk/*
// @include      http*://chaoshi.tmall.com/*
// @include      http*://detail.tmall.hk/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 淘宝天猫优惠券,查找优惠券!!!.
    $(document).ready(function() {
      var str_host       = window.location.host;
      var str_host_name  = 'taobao';
      var str_goods_name = '';//$(document).attr('title');
      if(str_host.indexOf('taobao.com')==-1) str_host_name = 'tm';
      if(str_host_name=='taobao'){
          str_goods_name = $('.tb-main-title').text();
      }else{
          str_goods_name = $('meta[name=keywords]').attr('content');
      }
      str_goods_name=$.trim(str_goods_name);

    var btn_quan_taobao = '<a style="display: inline-block;font-size: 30px;font-weight: normal;height:30px;line-height:30px;text-align: " href="https://www.ishtq.com/?m=search&a=index&k='+ encodeURI(str_goods_name) +'" target="_blank">查优惠券</a>;
     var btn_quan_tmall =  '<div class="tb-action" style="margin-top:0"><a style="display: inline-block;padding:;font-size: 30px;font-weight: normal;height:30px;line-height:30px;width:200px;text-align: " href="https://www.ishtq.com/?m=search&a=index&k='+ encodeURI(str_goods_name) +'">查优惠券</a></div>';
       var faNode = document.querySelector("div#J_Title p.tb-subtitle, div.tb-detail-hd");
      if(str_host_name=='taobao'){
          $('.tb-action').append(btn_quan_taobao);
          $('.tb-action').append(btn_search_taobao);

      }else{
          $('.tb-sku').append(btn_quan_tmall);
          $('.tb-sku').append(btn_search_tmall);
      }
    });
})();
