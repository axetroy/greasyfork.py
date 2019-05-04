// ==UserScript==
// @name         一键领取淘宝taobao，天猫tmall隐藏内部大额优惠券,简单又省钱，，一键免费看爱奇艺，腾讯，优酷，芒果tv，乐视，pptv等VIP视频
// @name:zh-TW   壹鍵領取淘寶taobao，天貓tmall隱藏內部大額優惠券,簡單又省錢，，壹鍵免費看愛奇藝，騰訊，優酷，芒果tv，樂視，pptv等VIP視頻
// @namespace    https://www.jrtjt.cn/
// @version      1.5.4
// @description  一键看优酷VIP视频，爱奇艺VIP视频，腾讯VIP视频，乐视VIP视频；一键快速领取淘宝，天猫内部隐藏大额优惠券,购物更省钱。操作简单，有优惠券商品点击领取优惠券，直接到达淘宝官方优惠券领取页面，不经过第三方导购页面，简化操作步骤，支持淘宝网，天猫，天猫超市，天猫国际。
// @description:zh-tw  壹鍵看優酷VIP視頻，愛奇藝VIP視頻，騰訊VIP視頻，樂視VIP視頻；壹鍵快速領取淘寶，天貓內部隱藏大額優惠券,購物更省錢。操作簡單，有優惠券商品點擊領取優惠券，直接到達淘寶官方優惠券領取頁面，不經過第三方導購頁面，簡化操作步驟，支持淘寶網，天貓，天貓超市，天貓國際。
// @author       shanelee
// @match        *://item.taobao.com/*
// @match        *://detail.tmall.com/*
// @match        *://detail.tmall.hk/*
// @match        *://chaoshi.detail.tmall.com/*
// @match        *://detail.liangxinyao.com/*
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.mgtv.com/b/*
// @match        *://*.sohu.com/*
// @match        *://v.pptv.com/show/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @require      https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    $(document).ready(function() {
		var host = window.location.host;
        var itemName = '';//$(document).attr('title');
        var itemId = '';
        var link = window.location;
		// alert(link);
        var asvideoBtn = '<a href="http://zheteng.pw/vip.php?url=' + link + '" target="_blank" style="cursor: pointer; text-decoration: none; color: red; padding: 0px 5px; border: 1px solid red; font-size: 24px; display: inline-block; height: 36px; line-height: 36px; margin: 0px 5px;">一键看VIP视频</a>';
		if (host == 'item.taobao.com') {
            itemId = $("link[rel=canonical]").attr("href");
            itemId = itemId.split("id=")[1];
            itemName = $('.tb-main-title').attr('data-title');
            var btn_quan_taobao = '<a style="display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;height:26px;line-height:26px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:2px;color: #fff;background-color: #DF231C;#FF0036;margin-left:10px" href="https://www.jrtjt.cn/api/tbq?type=0&itmename='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">领取优惠券</a>';
            $('.tb-action').append(btn_quan_taobao);
		}else if(host == 'detail.tmall.com'){
            itemId = $("link[rel=canonical]").attr("href");
            itemId = itemId.split("id=")[1];
            itemName = $('meta[name=keywords]').attr('content');
            var btn_quan_tmall =   '<div class="tb-action" style="margin-top:0"><a style="display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;height:26px;line-height:26px;width:156px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:2px;color: #fff;background-color: #DF231C;#FF0036;" href="https://www.jrtjt.cn/api/tbq?type=1&itmename='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">领取优惠券</a></div>';
			$('.tb-sku').append(btn_quan_tmall);
        }else if(host == 'chaoshi.detail.tmall.com'){
            itemId = $('a[id=J_AddFavorite]').attr('data-aldurl')
            itemId = itemId.split("itemId=")[1]
            itemName = $('input[name=title]').attr('value');
            var btn_chaoshi_tmall = '<div class="tb-action tb-btn-add tb-btn-sku"><a href="https://www.jrtjt.cn/api/tbq?type=1&itmename='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">领取优惠券</a></div>'
            $('.tb-sku').append(btn_chaoshi_tmall);
        }else if(host == 'detail.tmall.hk'){
            itemId = $("link[rel=canonical]").attr("href");
            itemId = itemId.split("id=")[1];
            itemName = $('meta[name=keywords]').attr('content');
            var btn_tmall_hk =   '<div class="tb-action" style="margin-top:0"><a style="display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;height:26px;line-height:26px;width:156px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:2px;color: #fff;background-color: #DF231C;#FF0036;" href="https://www.jrtjt.cn/api/tbq?type=1&itmename='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">领取优惠券</a></div>';
			$('.tb-sku').append(btn_tmall_hk);
        }else if(host == 'detail.liangxinyao.com'){
            itemId = $("link[rel=canonical]").attr("href");
            itemId = itemId.split("id=")[1];
            itemName = $('meta[name=keywords]').attr('content');
            var btn_jk_tmall =   '<div class="tb-action" style="margin-top:0"><a style="display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;height:26px;line-height:26px;width:156px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:2px;color: #fff;background-color: #DF231C;#FF0036;" href="https://www.jrtjt.cn/api/tbq?type=1&itmename='+ encodeURI(itemName) +'&id='+ encodeURI(itemId) +'" " target="_blank">领取优惠券</a></div>';
			$('.tb-sku').append(btn_jk_tmall);
        }else if(host == 'www.iqiyi.com') {
			$('.qy-player-title').append(asvideoBtn);
		}else if(host == 'v.qq.com'){
			$('.video_score').append(asvideoBtn);
		}else if(host == 'v.youku.com'){
            $('#subtitle').append(asvideoBtn);
        }else if(host == 'www.mgtv.com'){
            $('.v-panel-title').append(asvideoBtn);
        }else if(host == 'www.le.com'){
            $('.briefIntro_tit').append(asvideoBtn);
        }else if(host == 'tv.sohu.com'){
            $('.crumbs').append(asvideoBtn);
        }else if(host == 'v.pptv.com'){
            $('.hd').append(asvideoBtn);
        }else if(host == 'v.yinyuetai.com'){
            $('.videoName').append(asvideoBtn);
        }
    });
})();