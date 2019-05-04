// ==UserScript==
// @name         vipvideo
// @namespace    https://www.lixiaopeng.top/
// @version      1.0.0
// @description  test
// @author       adam改写
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.tudou.com/listplay/*
// @match        *://*.tudou.com/albumplay/*
// @match        *://*.tudou.com/programs/view/*
// @match        *://*.mgtv.com/b/*
// @match        *://film.sohu.com/album/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/video/*
// @match        *://*.bilibili.com/anime/*
// @match        *://vip.pptv.com/show/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.wasu.cn/Play/show/*
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
    var vipBtn = '<a id="sonimeiVipBtn" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;">vip解析</a>';
    var mSearchBtn = '<a id="sonimeiSearchBtn" target="_blank" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;">搜索电影</a>';

    // 爱奇艺
    if(reAqy.test(videoSite)){
        var iqiyiTitle = $('#widget-videotitle');
        iqiyiTitle.parent('.mod-play-tit').append(vipBtn).append(mSearchBtn);
        $('#sonimeiVipBtn').css({'font-size':'17px','display':'inline-block','height':'24px','line-height':'24px','margin':'0 5px'});
        $('#sonimeiSearchBtn').css({'font-size':'17px','display':'inline-block','height':'24px','line-height':'24px','margin':'0 5px'});
        if($('#drama-series-title').length !== 0){
            curWords = $('#drama-series-title').find('a').text();
        }else{
            curWords = iqiyiTitle.text();
        }
        $('#sonimeiSearchBtn').attr('href','http://movie.lixiaopeng.top/seacher.php?wd=' + curWords + '&p=1');
    }
    // 乐视
    if(reLS.test(videoSite)){
        var lsTitle = $('.j-video-name');
        lsTitle.after(mSearchBtn).after(vipBtn);
        lsTitle.css('float','left');
        $('#sonimeiVipBtn').css({'font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
        $('#sonimeiSearchBtn').css({'font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
        if($('.Info').find('.title').find('h3').length !== 0){
            curWords = $('.Info').find('.title').find('h3').text();
        }else{
            curWords = lsTitle.text();
        }
        $('#sonimeiSearchBtn').attr('href','http://movie.lixiaopeng.top/seacher.php?wd=' + curWords + '&p=2');
    }
    // 腾讯
    if(reTX.test(videoSite)){
        var qqTitle = $('.mod_intro').find('.video_title');
        qqTitle.eq(0).after(mSearchBtn).after(vipBtn);
        $('#sonimeiVipBtn').css({'font-size':'24px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        $('#sonimeiSearchBtn').css({'font-size':'24px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        if($('.player_title').length !== 0 && $('.player_title').find('a').length === 0){
            curWords = $('.player_title').find('a').text();
        }else{
            curWords = $('._base_title').text();
        }
        if(curWords === ''){
            curWords = $('.player_title').find('a').text();
        }
        $('#sonimeiSearchBtn').attr('href','http://movie.lixiaopeng.top/seacher.php?wd=' + curWords + '&p=1');
    }
    // 土豆
    if(reTD.test(videoSite)){
        var tdTitle = $('#videoKw');
        tdTitle.parent('.fix').append(vipBtn);
        $('#sonimeiVipBtn').css({'font-size':'18px','display':'inline-block','height':'22px','line-height':'22px','margin':'14px 5px 0'});
    }
    // 芒果
    if(reMG.test(videoSite)){
        var mgTitle = $('.v-panel-title');
        mgTitle.after(mSearchBtn).after(vipBtn);
        mgTitle.css({'float':'left','margin-right':'0'});
        $('#sonimeiVipBtn').css({'font-size':'22px','display':'inline-block','height':'40px','line-height':'40px','margin':'0 5px'});
        $('#sonimeiSearchBtn').css({'font-size':'22px','display':'inline-block','height':'40px','line-height':'40px','margin':'0 5px'});
        curWords = mgTitle.text();
        $('#sonimeiSearchBtn').attr('href','http://movie.lixiaopeng.top/seacher.php?wd=' + curWords + '&p=1');
    }
    // 搜狐
    if(reSH.test(videoSite)){
        var shTitle = $('.player-top-info-name');
        shTitle.append(vipBtn).append(mSearchBtn);
        shTitle.find('h2').css({'float':'left'});
        $('#sonimeiVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        $('#sonimeiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        curWords = shTitle.find('h2').text();
        $('#sonimeiSearchBtn').attr('href','http://movie.lixiaopeng.top/seacher.php?wd=' + curWords + '&p=1');
    }
    // acfun
    if(reAF.test(videoSite)){
        var acTitle = $('.head').find('.title');
        acTitle.append(vipBtn);
        $('#sonimeiVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
    }
    // bilibili
    if(reBL.test(videoSite)){
        var biliTitle = $('.v-title').find('h1');
        biliTitle.after(vipBtn);
        biliTitle.css({'float':'left','margin-right':'0'});
        $('#sonimeiVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
    }
    // pptv
    if(rePP.test(videoSite)){
        var pptvTitle = $('.title_video').find('h3');
        pptvTitle.after(mSearchBtn).after(vipBtn);
        $('#sonimeiVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        $('#sonimeiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        curWords = pptvTitle.text();
        $('#sonimeiSearchBtn').attr('href','http://movie.lixiaopeng.top/seacher.php?wd=' + curWords + '&p=1');
    }
    if(reYk.test(videoSite)){
        var youkuTitle = $('#subtitle');
        if(youkuTitle.length !== 0){
            youkuTitle.after(mSearchBtn).after(vipBtn);
            $('#sonimeiVipBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
            $('#sonimeiSearchBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
            if($('.tvinfo').length !== 0){
                curWords = $('.tvinfo').find('h2').eq(0).find('a').text();
            }else{
                curWords = $('.title').attr('title');
            }
            $('#sonimeiSearchBtn').attr('href','http://movie.lixiaopeng.top/seacher.php?wd=' + curWords + '&p=1');
        }else{
            $('.title').after(mSearchBtn).after(vipBtn);
            $('#sonimeiVipBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
            $('#sonimeiSearchBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
            if($('.tvinfo').length !== 0){
                curWords = $('.tvinfo').find('h3').eq(0).text();
            }else{
                curWords = $('.title').attr('title');
            }
            $('#sonimeiSearchBtn').attr('href','http://movie.lixiaopeng.top/seacher.php?wd=' + curWords + '&p=1');
        }
    }
    // 音悦台
    if(reYYT.test(videoSite)){
        var yytTitle = $('.videoName');
        yytTitle.append(vipBtn);
        $('#sonimeiVipBtn').css({'font-weight':'bold','font-size':'14px','display':'inline-block','height':'32px','line-height':'32px','margin':'0 5px'});
    }
    $('#sonimeiVipBtn').on('click',function(){
        curPlaySite = window.location.href;
        window.location.href = 'http://movie.lixiaopeng.top/url.php?url=' + curPlaySite;
    });
})();