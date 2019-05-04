// ==UserScript==
// @name         解析VIP视频
// @namespace    viptest
// @version      1.0.1
// @description  好不好用谁用谁知道，在视频标题嵌入VIP解析按钮，支持优酷、爱奇艺、乐视、腾讯、土豆、芒果、搜狐、pptv、华数、1905、A站等主流网站，接口是使用别人的，如果有广告请勿相信。关于电视剧选集问题：每次选集都需要刷新页面,不然无法定位到该集播放。
// @author       Alice改
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.tudou.com/listplay/*
// @match        *://*.tudou.com/albumplay/*
// @match        *://*.tudou.com/programs/view/*
// @match        *://video.tudou.com/v/*
// @match        *://*.mgtv.com/b/*
// @match        *://film.sohu.com/album/*
// @match        *://tv.sohu.com/v/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/*
// @match        *://*.bilibili.com/video/*
// @match        *://*.bilibili.com/anime/*
// @match        *://*.bilibili.com/bangumi/play/*
// @match        *://v.pptv.com/show/*
// @match        *://*.pptv.com/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.wasu.cn/Play/show/*
// @match        *://vip.1905.com/play/*
// @match        *://miaomiaoai.cn/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var curPlaySite = '';
    var curWords = '';
    var videoSite = window.location.href;
    var reYk = /youku/i;
    var reAqy = /iqiyi/i;
    var reLS = /le/i;
    var reTX = /qq/i;
    var reTD = /tudou/i;
    var reMG = /mgtv/i;
    var reSH = /sohu/i;
    var reAF = /acfun/i;
    var reBL = /bilibili/i;
    var reYJ = /1905/i;
    var rePP = /pptv/i;
    var reYYT = /yinyuetai/i;
    var repupudy = /pupudy/i;
    var reWs =/wasu/i;
    var vipBtn = '<a id="pupudyBtn" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;" target="_blank">VIP解析</a>';
    // 优酷
    if(reYk.test(videoSite)){
        var youkuTitle = $('#subtitle');
        if (youkuTitle.length !== 0) {
            youkuTitle.append(vipBtn);
            $('#pupudyBtn').css({'font-size':'24px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
        }
    }
    // 爱奇艺
    if(reAqy.test(videoSite)){
        var iqiyiTitle ='';
         if((($('.qy-player-score')||$('.player-title')))!=0){
            iqiyiTitle =$('.qy-player-score');
            iqiyiTitle =$('.player-title');
            iqiyiTitle.after(vipBtn);
            $('#pupudyBtn').css({'font-size':'24px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
            curPlaySite = window.location.href;
            $('#pupudyBtn').attr('href','http://miaomiaoai.cn/vip/play.html?url=' + curPlaySite);//接口失效，在这里更换
        }
        if($('.mod-play-tit.play-tit-width')!=0){
            iqiyiTitle = $('.mod-play-tit.play-tit-width');
            iqiyiTitle.append(vipBtn);
            $('#pupudyBtn').css({'font-size':'24px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
        }
        if($('.mod-play-tit')!=0){
            iqiyiTitle = $('.mod-play-tit');
            iqiyiTitle.append(vipBtn);
            $('#pupudyBtn').css({'font-size':'24px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
        }
    }
    // 乐视
    if(reLS.test(videoSite)){
        var lsTitle = $('.briefIntro_tit');
        lsTitle.append(vipBtn);
        lsTitle.css('float','left');
        $('#pupudyBtn').css({'font-size':'24px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
    }
    // 腾讯
    if(reTX.test(videoSite)){
        var qqTitle = $('.video_title');
        qqTitle.eq(0).after(vipBtn);
        $('#pupudyBtn').css({'font-size':'24px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
    }
    // 土豆
    if(reTD.test(videoSite)){
        var tdTitle = $('#subtitle');
        tdTitle.after(vipBtn);
        $('#pupudyBtn').css({'font-size':'24px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
    }
    // 芒果
    if(reMG.test(videoSite)){
        var mgTitle = $('.v-panel-title');
        mgTitle.after(vipBtn);
        mgTitle.css({'float':'left','margin-right':'0'});
        $('#pupudyBtn').css({'font-size':'22px','display':'inline-block','height':'40px','line-height':'40px','margin':'0 5px'});

    }
    // 搜狐
    if(reSH.test(videoSite)){
        var shTitle = '';
        if($('.left')!=null){
            shTitle = $('.left');
            shTitle.append(vipBtn);
            shTitle.find('h2').css({'float':'left'});
            $('#pupudyBtn').css({'font-size':'22px','display':'inline-block','height':'25px','line-height':'25px','margin':'0 5px'});
        }
        if($('.player-top-info-name')!=null){
            shTitle =$('.player-top-info-name');
            shTitle.append(vipBtn);
            shTitle.find('h2').css({'float':'left'});
            $('#pupudyBtn').css({'font-size':'24px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        }
    }
    // acfun
    if(reAF.test(videoSite)){
        var acTitle = $('.head').find('.title');
        acTitle.append(vipBtn);
        $('#pupudyBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
    }
    // bilibili
    if(reBL.test(videoSite)){
        var biliTitle = $('.header-info').find('h1');
        biliTitle.append(vipBtn);
        $('#pupudyBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
        $('#pupudyBtn').on('click',function(){
            curPlaySite = window.location.href;
            window.open('https://vip.mpos.ren/v/?url=' + curPlaySite);//B站没解析接口
        });
    }
    // pptv
    if(rePP.test(videoSite)){
        var pptvTitle = $('.play-comment');
        pptvTitle.after(vipBtn);
        $('#pupudyBtn').css({'font-weight':'bold','font-size':'30px','display':'inline-block','height':'45px','line-height':'45px','margin':'0 5px'});
    }
    // 音悦台
    if(reYYT.test(videoSite)){
        var yytTitle = $('.videoName');
        yytTitle.append(vipBtn);
        $('#pupudyBtn').css({'font-weight':'bold','font-size':'14px','display':'inline-block','height':'32px','line-height':'32px','margin':'0 5px'});
    }
    //华数
    if(reWs.test(videoSite)){
        var wasuTitle = $('#play_vod_hits');
        wasuTitle.append(vipBtn);
        $('#pupudyBtn').css({'font-weight':'bold','font-size':'14px','display':'inline-block','height':'32px','line-height':'32px','margin':'0 5px'});
    }
    //1905
    if(reYJ.test(videoSite)){
        var YJTitle = $('.nav-title');
        YJTitle.after(vipBtn);
        $('#pupudyBtn').css({'font-weight':'bold','font-size':'14px','display':'inline-block','height':'32px','line-height':'32px','margin':'0 5px'});
        $('#pupudyBtn').on('click',function(){
            curPlaySite = window.location.href;
            window.open('http://yun.baiyug.cn/vip/index.php?url=' + curPlaySite);
        });
    }
    $('#pupudyBtn').on('click',function(){
        curPlaySite = window.location.href;
        window.open('http://miaomiaoai.cn/vip/play.html?url=' + curPlaySite);//接口失效，在这里更换
        //window.open('http://yun.baiyug.cn/vip/?url=' + curPlaySite);
        //window.open('http://mlxztz.com/player.php?url=' + curPlaySite);
    });
})();