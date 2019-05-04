// ==UserScript==
// @name         淘宝天猫隐藏优惠券 一键领取 优惠70%以上！2018.5.25急速稳定版
// @namespace    http://zfh.55xu.com/
// @version      1.2
// @description  通过淘宝客返利网站，查询商家设置的隐藏优惠券信息！直接领取优惠券购买。
// @author       省钱购
// @include      http*://item.taobao.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://detail.tmall.hk/*
// @include      http*://s.taobao.com/*
// @include      http*://ai.taobao.com/search/*
// @include      http*://ai.taobao.com/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==
    (function() {
    var location = window.location.host;
	var num = 0;
    if(location.indexOf("item.taobao.com")>=0){
		num = 0;
	}else if(location.indexOf("detail.tmall") >= 0){
		num = 1;
	}else if(location.indexOf("s.taobao.com")>=0){
		num = 2;
	}else if(location.indexOf("list.tmall.com")>=0){
		num = 3;
	}else if(location.indexOf("ai.taobao.com")>=0){
        num = 4;
    }
setInterval(function(){
		getData(num);
},1000);
    })();

    function getData(num){
        var name;
        var html;
		switch(num){
						  case 0:
                          if($('.tb-main-title').hasClass("jia")){
                          }else{
                          $('.tb-main-title').addClass("jia");
                              name = $('.tb-main-title').text();
                              html = '<div class="tb-btn-buy" style="padding-top:10px;"><a href="http://zfh.55xu.com/index.php?r=searchlist&kwd='+ encodeURI(name) + '" target="_blank">领取商品优惠券</a></div><div class="tb-btn-add" style="padding-top:10px;"><a href="http://zfh.55xu.com/" target="_blank">获取更多优惠产品</a></div>';
                              $('.tb-action').append(html);
                               }
						  break;
						  case 1:
                          if($('meta[name=keywords]').hasClass("jia")){
                          }else{
                          $('meta[name=keywords]').addClass("jia");
                             name = $('meta[name=keywords]').attr('content');
                             html = '<div class="tb-btn-buy tb-btn-sku" style="padding-top:10px;"><a href="http://zfh.55xu.com/index.php?r=searchlist&kwd='+ encodeURI(name) + '" target="_blank">领取商品优惠券</a></div><div class="tb-btn-basket tb-btn-sku" style="padding-top:10px;"><a href="http://lingquyouhuiquan.cn/" target="_blank">获取更多优惠产品</a></div>';
                             $('.tb-action').append(html);
                               }
						  break;
						  case 2:
						   $.each($(".pic"),function(index){
                               if(index != -1){
		                       if($(this).hasClass("jia")){

		                       }else{
			                       $(this).addClass("jia");
			                       var id = $(this).find("a").attr("data-nid");
                                   name = $.trim($(this).parents(".item").find(".row-2").text());
                                   //alert(index + ":" + name);
                                   $(this).parents(".item").find(".g_price").append('<a href="http://zfh.55xu.com/index.php?r=searchlist&kwd=' + encodeURI(name) + ' " target="_blank"><em style="font-size:15px;color:red;border-style:solid;border-width:2px;padding:3px;"><strong>领取优惠券</strong></em></a>');
			                           }
		                            }
                               });
						  break;
						  case 3:
                          $.each($(".productShop"),function(index){
		                       if($(this).hasClass("jia")){

		                       }else{
			                       $(this).addClass("jia");
                                   name = $.trim($(this).closest(".product").find(".productTitle").text());
                                   $(this).closest(".product").find(".productPrice").append('<a href="http://zfh.55xu.com/index.php?r=searchlist&kwd=' + encodeURI(name) + '" target="_blank" ><em style="font-size:12px;color:red;border-style:solid;border-width:1px;padding-bottom:6px;height:20px;"><strong>领取优惠券</strong></em></a>');

                               }
	                            });
						  break;
                          case 4:
                          $(".title").each(function(){
		                       if($(this).hasClass("jia")){

		                       }else{
			                       $(this).addClass("jia");
                                   name = $(this).children("a:first").text();
                                   $(this).after('<div style="margin-left:12px;"><a href="http://zfh.55xu.com/index.php?r=searchlist&kwd=' + encodeURI(name.replace(/(^\s*)|(\s*$)/g, "")) + '" target="_blank" ><em style="font-size:12px;color:red;border-style:solid;border-width:1px;padding-bottom:6px;height:20px;"><strong>领取优惠券</strong></em></a><div>');
                               }
	                            });
                          break;
						  default:

						  break;
					  }
    }