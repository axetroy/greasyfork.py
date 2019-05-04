// ==UserScript==
// @name         【VIP】视频在线解析&去广告
// @namespace    http://http://unbelievable.3vkj.net/
// @version      3.9.4.1
// @description  主要解析爱奇艺、优酷、腾讯、乐视、搜狐等VIP在线视频&1905、音悦台等去广告,在视频标题旁边添加“@史婷露”按钮。
// @author       原作者:龙轩  修改:@史婷露
// @match        *://*.iqiyi.com/a_*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://v.youku.com/v_show/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://tv.sohu.com/20*
// @match        *://film.sohu.com/album/*
// @match        *://*.tudou.com/listplay/*
// @match        *://*.tudou.com/albumplay/*
// @match        *://*.tudou.com/programs/view/*
// @match        *://*.mgtv.com/b/*
// @match        *://v.pptv.com/show/*
// @match        *://vip.pptv.com/show/*
// @match        *://ddp.vip.pptv.com/vod_detail/*
// @match        *://vip.1905.com/play/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/video/*
// @match        *://*.bilibili.com/anime/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var url = '';
    var link = '';
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
    var vipBtn = '<a id="stlBtn" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;">@史婷露</a>';
    
    // 优酷
    if(reYk.test(videoSite)){
        var youkuTitle = $('#subtitle');
        youkuTitle.parent('.title').after(vipBtn);
        $('#stlBtn').css({'font-size':'15px','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
    }
    
    // 爱奇艺
    if(reAqy.test(videoSite)){
        var iqiyiTitle = $('#widget-videotitle');
        iqiyiTitle.parent('.mod-play-tit').append(vipBtn);
        $('#stlBtn').css({'font-size':'17px','height':'24px','line-height':'24px','margin':'0 5px'});
    }
    
    // 乐视
    if(reLS.test(videoSite)){
        var lsTitle = $('.j-video-name');
        lsTitle.after(vipBtn);
        lsTitle.css('float','left');
        $('#stlBtn').css({'font-size':'15px','height':'20px','line-height':'20px','margin':'0 5px'});
    }
    
    // 腾讯
    if(reTX.test(videoSite)){
        var qqTitle = $('.video_title');
        qqTitle.eq(0).after(vipBtn);
        $('#stlBtn').css({'font-size':'15px','height':'30px','line-height':'30px','margin':'0 5px'});
    }
    
    // 土豆
    if(reTD.test(videoSite)){
        var tdTitle = $('#videoKw');
        tdTitle.parent('.fix').append(vipBtn);
        $('#stlBtn').css({'font-size':'18px','height':'22px','line-height':'22px','margin':'14px 5px 0'});
    }
    
    // 芒果
    if(reMG.test(videoSite)){
        var mgTitle = $('.v-panel-title');
        mgTitle.after(vipBtn);
        mgTitle.css({'float':'left','margin-right':'0','margin-top':'-5px'});
        $('#stlBtn').css({'font-size':'20px','height':'30px','line-height':'30px','margin':'0 5px'});
    }
    
    // 搜狐
    if(reSH.test(videoSite)){
        var shTitle = $('.player-top-info-name');
        shTitle.append(vipBtn);
        shTitle.find('h2').css({'float':'left','margin-top':'-8px'});
        $('#stlBtn').css({'font-weight':'bold','font-size':'16px','height':'24px','line-height':'24px','margin':'0 5px'});
    }
    
    // acfun
    if(reAF.test(videoSite)){
        var acTitle = $('.head').find('.title');
        acTitle.append(vipBtn);
        $('#stlBtn').css({'font-weight':'bold','font-size':'16px','height':'20px','line-height':'20px','margin':'0 5px'});
    }
    
    // bilibili
    if(reBL.test(videoSite)){
        var biliTitle = $('.v-title').find('h1');
        biliTitle.after(vipBtn);
        biliTitle.css({'float':'left','margin-right':'0'});
        $('#stlBtn').css({'font-weight':'bold','font-size':'16px','height':'36px','line-height':'36px','margin':'0 5px'});
    }
    
    // pptv
    if(rePP.test(videoSite)){
        var pptvTitle = $('.title_video').find('h3');
        pptvTitle.after(vipBtn);
        $('#stlBtn').css({'font-weight':'bold','font-size':'16px','height':'36px','line-height':'36px','margin':'0 5px'});
    }
    
    // 音悦台
    if(reYYT.test(videoSite)){
        var yytTitle = $('.videoName');
        yytTitle.append(vipBtn);
        $('#stlBtn').css({'font-weight':'bold','font-size':'14px','height':'32px','line-height':'32px','margin':'0 5px'});
    }
    
    //链接
    $('#stlBtn').on('click',function(){
        url = window.location.href;
		if(url.indexOf('iqiyi.com/a_')>=0){
			link="http://https://www.yymeier.com/api.php?url=="+url;
		}else if(url.indexOf('iqiyi.com/v_')>=0 || url.indexOf('iqiyi.com/dianying')>=0){
			link="https://www.yymeier.com/api.php?url="+url;
		}else if(url.indexOf('v.qq.com/x')>=0){
			link="http://api.baiyug.cn/vip/index.php?url="+url;
		}else if(url.indexOf('vip.1905.com/play')>=0){
			link="http://aikan-tv.com/?url="+url;}
		else{
			link="https://api.47ks.com/webcloud/?v="+url;
		}
		window.open(link,'_self'); 
    });
})();