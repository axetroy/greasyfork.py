// ==UserScript==
// @name         自动开启网页全屏
// @namespace    https://github.com/idcpj
// @version      0.5
// @description  网页加载完4秒后,启动网页全屏
// @require      https://cdn.jsdelivr.net/jquery/1.7.2/jquery.min.js
// @author       idcpj
// @match        *://v.qq.com/x/cover/*
// @match        *live.bilibili.com/*
// @match        *www.youtube.com/watch?v=*
// @match        *www.iqiyi.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    var videoSite = window.location.href;
    //var bilibili = /www\.bilibili\.com\/video\/av/i;
    var bililive = /live\.bilibili\.com/i;
    var qqvideo = /v\.qq\.com\/x\/cover/i;
    var youtube = /www\.youtube\.com\/watch\?v=/;
    var yiqile = /www\.iqiyi\.com/;


    //b 视频
    //if(bilibili.test(videoSite)){
    //window.setTimeout(function(){
    //  document.getElementsByName('web_fullscreen')[1].click();
    //}, 100000);
    //}

    //b 站 直播
    if(bililive.test(videoSite)){
        window.setTimeout(function(){
            $('button[data-title="网页全屏"]').click();
        }, 3000);
    }
    //腾讯视频
    if(qqvideo.test(videoSite)){
        window.setTimeout(function(){
            $(".txp_btn_fake").click();
        }, 3000);
    }
    //youtube  ytp-size-button
    if(youtube.test(videoSite)){
        window.setTimeout(function(){
            $(".ytp-size-button").click();
        }, 3000);
    }
    // 爱奇艺
    if(yiqile.test(videoSite)){
        window.setTimeout(function(){
            $("a[data-player-hook='webfullscreen']").click();
        }, 5000);
    }

})();