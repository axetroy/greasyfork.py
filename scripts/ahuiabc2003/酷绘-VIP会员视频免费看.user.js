// ==UserScript==
// @name         酷绘-VIP会员视频免费看
// @namespace    kuhuiv.com
// @version      3.2.2
// @description  各大视频网站VIP会员视频免费看，支持各大视频网站，操作更加便捷
// @author       作者：阿辉
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.wasu.cn/Play/show/id/*
// @match        *://*.mgtv.com/b/*
// @match        *://film.sohu.com/album/*
// @match        *://tv.sohu.com/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/video/*
// @match        *://*.bilibili.com/bangumi/*
// @match        *://v.pptv.com/show/*
// @match        *://vip.1905.com/play/*
// @match        *://www.miguvideo.com/wap/resource/pc/detail/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://kuhuiv.com/*
// @require      https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
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
    var reWS = /wasu/i;
    var reMG = /mgtv/i;
    var reSH = /film.sohu/i;
    var reSHTV = /tv.sohu/i;
    var reAF = /acfun/i;
    var reBL = /bilibili/i;
    var rePP = /pptv/i;
    var rem19 = /1905/i;
    var remigu = /migu/i;
    var reYYT = /yinyuetai/i;
    var rekuhuiv = /kuhuiv/i;
    var vipBtn = '<a id="huuiBtn" style="cursor:pointer;text-decoration:none;color:#FF6600;padding:0 5px;border:1px solid #FF6600;">VIP随心看-酷</a>';
    var mSearchBtn = '<a id="huuiSearchBtn" target="_blank" style="cursor:pointer;text-decoration:none;color:#FF6600;padding:0 5px;border:1px solid #FF6600;">最新大片</a>';
    // youku
    if(reYk.test(videoSite)){
        var youkuTitle = $('#playerBox');
        youkuTitle.after(mSearchBtn).after(vipBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        curWords = youkuTitle.text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // IQIYI
    if(reAqy.test(videoSite)){
        var iqiyiTitle = $('#widget-videotitle');
        iqiyiTitle.parent('.mod-play-tit').append(vipBtn).append(mSearchBtn);
        $('#huuiBtn').css({'font-size':'16px','display':'inline-block','height':'24px','line-height':'24px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-size':'16px','display':'inline-block','height':'24px','line-height':'24px','margin':'0 5px'});
        if($('#drama-series-title').length !== 0){
         curWords = $('#drama-series-title').find('a').text();
        }else{
         curWords = iqiyiTitle.text();
        }
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );

    }
    // LETV
    if(reLS.test(videoSite)){
        var lsTitle = $('.briefIntro_tit');
        lsTitle.after(mSearchBtn).after(vipBtn);
        lsTitle.css('float','left');
        $('#huuiBtn').css({'font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
       	if($('.Info').find('.title').find('h3').length !== 0){
        	curWords = $('.Info').find('.title').find('h3').text();
        }else{
        	curWords = lsTitle.text();
        }
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // QQ
    if(reTX.test(videoSite)){
        var qqTitle = $('.video_score');
        qqTitle.eq(0).after(mSearchBtn).after(vipBtn);
        $('#huuiBtn').css({'font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        if($('.player_title').length !== 0 && $('.player_title').find('a').length === 0){
        	curWords = $('.player_title').text();
        }else{
        	curWords = $('._base_title').text();
        }
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // wasu
    if(reWS.test(videoSite)){
        var wsTitle = $('.play_nav');
        wsTitle.after(mSearchBtn).after(vipBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'26px','line-height':'26px','margin':'5px 5px'});
        $('#huuiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'26px','line-height':'26px','margin':'5px 5px'});
        curWords = wsTitle.text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // MGTV
    if(reMG.test(videoSite)){
        var mgTitle = $('.v-panel-title');
        mgTitle.after(mSearchBtn).after(vipBtn);
        $('#huuiBtn').css({'font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
    	curWords = mgTitle.text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // SOUHU
    if(reSH.test(videoSite)){
        var shTitle = $('.player-top-info-name');
        shTitle.append(vipBtn).append(mSearchBtn);
        shTitle.find('h2').css({'float':'left'});
        $('#huuiBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        curWords = shTitle.find('h2').text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // SOUHUTV
    if(reSHTV.test(videoSite)){
        var shtvTitle = $('.crumbs');
        shtvTitle.append(vipBtn).append(mSearchBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-weight':'bold','font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
        curWords = shtvTitle.text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // acfun
    if(reAF.test(videoSite)){
        var acTitle = $('.head').find('.title');
        acTitle.append(vipBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
    }
    // bilibili
    if(reBL.test(videoSite)){
        var biliTitle = $('h1');
        biliTitle.after(mSearchBtn).after(vipBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
        curWords = biliTitle.text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // pptv
    if(rePP.test(videoSite)){
        var pptvTitle = $('.g-1408-hd');
        pptvTitle.after(mSearchBtn).after(vipBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        curWords = pptvTitle.text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // m19
    if(rem19.test(videoSite)){
        var m19Title = $('.nav-title');
        m19Title.after(mSearchBtn).after(vipBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        curWords = m19Title.text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // migu
    if(remigu.test(videoSite)){
        var miguTitle = $('.phone-look');
        miguTitle.after(mSearchBtn).after(vipBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        $('#huuiSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 5px'});
        curWords = miguTitle.text();
        $('#huuiSearchBtn').attr('href','http://www.kuhuiv.com/?kuhuiv.com' );
    }
    // yinyuetai
    if(reYYT.test(videoSite)){
        var yytTitle = $('.videoName');
        yytTitle.append(vipBtn);
        $('#huuiBtn').css({'font-weight':'bold','font-size':'14px','display':'inline-block','height':'28px','line-height':'28px','margin':'0 5px'});
    }
    $('#huuiBtn').on('click',function(){
        curPlaySite = window.location.href;
        window.location.href = 'http://www.6688.appsvipapi.kuuhui.com:65533/svipjx/liulanqichajian/browserplugin/appjxwen/?' + curPlaySite;
    });
})();