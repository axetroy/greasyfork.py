// ==UserScript==
// @name         去掉斗鱼的无用功能
// @version      1.2
// @description  去掉斗鱼的活动，游戏等功能，专心看直播。
// @author       MyFaith
// @match        http://*.douyu.com/*
// @match        https://*.douyu.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @run-at       document-end
// @namespace undefined
// ==/UserScript==

(function() {
    'use strict';
    var $ = $ || window.$;

    // 栏目页游中心
    $('li.channel-catelist-resize').eq(4).remove()
    $('li.rank').eq(0).next().remove()
    // 导航栏视频
    $('.video-entry').eq(0).remove()
    // 导航栏游戏
    $('.funny').eq(0).remove()
    // 导航栏鱼吧
    $('.yuba').eq(0).remove()
    // 导航栏粉丝节
    $('.wxr-menu').eq(0).remove()
    // 分享，手机看
    $('.sq-wrap').eq(0).remove()
    // 视频推荐
    $('#js-recommand').remove()
    // 右侧广告
    $('#js-chat-right-ad').remove()
    // 主播也爱看
    $('.rec').eq(0).remove()
    // 直播下方广告
    $('.room-ad-video-down').eq(0).remove()
    $('.room-ad-bottom').eq(0).remove()
    // 直播上方广告
    $('.room-ad-top').eq(0).remove()
    // 客户端下载
    $('.o-download').eq(0).remove()
    // 直播下方滚动广告
    $('.ft-sign-cont').eq(0).remove()
    // 签到左边的任务按钮
    $('.task-btn').eq(0).remove()
    // 关注下方的广告
    $('.f-sign-cont').eq(0).remove()
    // 搜索下方广告
    $('.s-ipt').click(function(){
        $('.search-suggest-ad').eq(0).remove()
        // 今日热搜
        $('.search-suggest-box-hot').eq(0).remove()
    })
    // 贵族粉丝团
    $('#js-fans-rank').remove()
    // 修改弹幕区样式
    $('.PlayerCaseSub-Main .chat-cont').css('top', '0')
    // 弹幕区广告
    $('.SignBarrage').eq(0).remove()
    // 延时执行
    setTimeout(function(){
        // 导航栏2018粉丝节荣誉回顾(timeout)
        $('.annualfestival-count').eq(0).remove()
        // 暑期活跃buff
        $('.summer_acitivity').eq(0).remove()
        // 我的任务
        $('.uinfo-dropmenu .task').eq(0).remove()
        // 斗鱼工会
        $('.nobility-privilege').eq(0).remove()
        // 去掉抽奖界面
        $(',bg-1a1f33').eq(0).remove()
        $('.luckBg1-7b13e4').eq(0).remove()
        $('.luckBg1-7b13e4').eq(0).remove()
        // 弹幕区活动
        $('.js-room-activity').eq(0).remove()
    }, 3000)
})();