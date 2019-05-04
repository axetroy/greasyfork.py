// ==UserScript==
// @name         淘宝 天猫 优惠券  一键领取 简单功能 不占内存 2018年9月30 v1.3 持续更新！TaoBao & Tmall Coupons!
// @namespace    http://quan.leonguo.cn/
// @version      1.3
// @description  阿里妈妈提供的优惠券，不用白不用，装上逛淘宝更省钱！ 正常逛淘宝点击商品旁边的【领取优惠券】按钮即可领对应商品优惠券！功能简单不占内存！！在打开页面自行修改关键词可以获得更多优惠券信息。 Provide Tmall and Taobao hidden coupons, save u money! Easy to use- visit Taobao an Tmall as normal, just click the 【领取优惠券】button to obtain the coupons!
// @author       淘淘省钱小帮手
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://detail.tmall.hk/*
// @include      http*://list.tmall.com/*
// @include      http*://list.tmall.hk/*
// @include      http*://s.taobao.com/*
// @include      http*://ai.taobao.com/search/*
// @include      http*://ai.taobao.com/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==
(function() {
    $(document).ready(function() {
        var location = window.location.host;
        var name;
        var html
        if(location.indexOf("item.taobao.com")>=0){
            name = $('.tb-main-title').text();
            name = $.trim(name).substring(0,9); //去掉商品标题前后空格 取商品标题前10个字符
            html = '<div class="tb-btn-buy" style="padding-top:10px;"><a href="http://quan.leonguo.cn/index.php?r=l&kw='+ encodeURI(name) + '" target="_blank">领取商品优惠券</a></div><div class="tb-btn-add" style="padding-top:10px;"><a href="http://quan.leonguo.cn/" target="_blank">获取更多优惠产品</a></div>';
            $('.tb-action').append(html);
        }else if(location.indexOf("detail.tmall") >= 0){
            name = $('meta[name=keywords]').attr('content');
            name = $.trim(name).substring(0,9);
            html = '<div class="tb-btn-buy tb-btn-sku" style="padding-top:10px;"><a href="http://quan.leonguo.cn/index.php?r=l&kw='+ encodeURI(name) + '" target="_blank">领取商品优惠券</a></div><div class="tb-btn-basket tb-btn-sku" style="padding-top:10px;"><a href="http://quan.leonguo.cn/" target="_blank">获取更多优惠产品</a></div>';
            $('.tb-action').append(html);
        }else if(location.indexOf("s.taobao.com")>=0){
            $.each($(".pic"),function(index){
                if(index != -1){
                    var id = $(this).find("a").attr("data-nid");
                    name = $.trim($(this).parents(".item").find(".row-2").text());
                    name = $.trim(name).substring(0,9);
                    //alert(index + ":" + name);
                    $(this).parents(".item").find(".g_price").append('<a href="http://quan.leonguo.cn/index.php?r=l&kw=' + encodeURI(name) + ' " target="_blank"><em style="font-size:15px;color:red;border-style:solid;border-width:2px;padding:3px;"><strong>领取优惠券</strong></em></a>');
                }
             });
        }else if(location.indexOf("list.tmall.com")>=0){

            $(".productTitle").each(function(){
                name = $(this).children("a").attr("title");
                name = $.trim(name).substring(0,9);
                $(this).prev().append('<a href="http://quan.leonguo.cn/index.php?r=l&kw=' + encodeURI(name) + '" target="_blank" ><em style="font-size:12px;color:red;border-style:solid;border-width:1px;padding-bottom:6px;height:20px;"><strong>领取优惠券</strong></em></a>');
            });


        }else if(location.indexOf("ai.taobao.com")>=0){
            $(".title").each(function(){
                name = $(this).children("a:first").text();
                name = name.substring(0,9);
                $(this).after('<div style="margin-left:12px;"><a href="http://quan.leonguo.cn/index.php?r=l&kw=' + encodeURI(name.replace(/(^\s*)|(\s*$)/g, "")) + '" target="_blank" ><em style="font-size:12px;color:red;border-style:solid;border-width:1px;padding-bottom:6px;height:20px;"><strong>领取优惠券</strong></em></a><div>');
	    });
        }
    });

})();