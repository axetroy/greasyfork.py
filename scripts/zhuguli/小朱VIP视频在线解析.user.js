// ==UserScript==
// @name         小朱VIP视频在线解析
// @namespace    http://zhuguli.tianyan.hk/web.php?id=cFkQ8Of
// @version      2.4
// @description  在各大视频网站的视频标题旁上显示“小朱vip解析”按钮，可以在线播放vip视频；支持优酷，腾讯，爱奇艺等常用视频。
// @author       小朱
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
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var curPlaySite = '';
    var curWords = '';
    var len='';
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
    var rePP = /pptv/i;
    var vipBtn = '<a id="ifkdyVipBtn" target="_blank" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;">小朱vip解析</a>';
    var mSearchBtn = '<a id="ifkdySearchBtn" target="_blank" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;">搜索该影视</a>';
    //优酷
    if(reYk.test(videoSite)){
        var youkuTitle = $('#subtitle');
        if(youkuTitle.length !== 0){
        	youkuTitle.after(vipBtn).after(mSearchBtn);
	        $('#ifkdyVipBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
            $('#ifkdySearchBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
	        if($('.tvinfo').length !== 0){
	        	curWords = $('.tvinfo').find('h2').eq(0).find('a').text();
	        }else{
	        	curWords = $('.title').attr('title');
	        }
	        $('#ifkdySearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
        }else{
        	$('.title').after(vipBtn).after(mSearchBtn);
        	$('#ifkdyVipBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
            $('#ifkdySearchBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
	       	if($('.tvinfo').length !== 0){
	        	curWords = $('.tvinfo').find('h3').eq(0).text();
	        }else{
	        	curWords = $('.title').attr('title');
	        }
	        $('#ifkdySearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
        }
    }
    //爱奇艺
    if(reAqy.test(videoSite)){
        var iqiyiTitle = $('#widget-videotitle');
        iqiyiTitle.parent('.mod-play-tit').append(vipBtn).append(mSearchBtn);
        $('#ifkdyVipBtn').css({'font-size':'17px','display':'inline-block','height':'24px','line-height':'24px','margin':'0 5px'});
        $('#ifkdySearchBtn').css({'font-size':'17px','display':'inline-block','height':'24px','line-height':'24px','margin':'0 5px'});
        if($('#drama-series-title').length !== 0){
        	curWords = $('#drama-series-title').find('a').text();
        }else{
        	curWords = iqiyiTitle.text();
        }
        $('#ifkdySearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
    }
    //乐视
    if(reLS.test(videoSite)){
        var lsTitle = $('.j-video-name');
        lsTitle.after(vipBtn).after(mSearchBtn);
        lsTitle.css('float','left');
        $('#ifkdyVipBtn').css({'font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
        $('#ifkdySearchBtn').css({'font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
       	if($('.Info').find('.title').find('h3').length !== 0){
        	curWords = $('.Info').find('.title').find('h3').text();
        }else{
        	curWords = lsTitle.text();
        }
         $('#ifkdySearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
    }
    //腾讯
    if(reTX.test(videoSite)){
        var qqTitle = $('.mod_intro').find('.video_title');
        qqTitle.eq(0).after(vipBtn).after(mSearchBtn);
        $('#ifkdyVipBtn').css({'font-size':'24px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        $('#ifkdySearchBtn').css({'font-size':'24px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        if($('.player_title').length !== 0 && $('.player_title').find('a').length === 0){
        	curWords = $('.player_title').text();
        }else{
        	curWords = $('._base_title').text();
        }
        if(curWords === ''){
        	curWords = $('.player_title').text();
        }
        if(curWords.indexOf("VIP") >= 0)
        {
             curWords = curWords.substring(3,curWords.length);
        }

        $('#ifkdySearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
    }
    //土豆
    if(reTD.test(videoSite)){
        var tdTitle = $('#videoKw');
        tdTitle.parent('.fix').append(vipBtn);
        $('#ifkdyVipBtn').css({'font-size':'18px','display':'inline-block','height':'22px','line-height':'22px','margin':'14px 5px 0'});
    }
    //芒果TV
    if(reMG.test(videoSite)){
        var mgTitle = $('.v-panel-title');
        mgTitle.after(vipBtn).after(mSearchBtn);
        mgTitle.css({'float':'left','margin-right':'0'});
        $('#ifkdyVipBtn').css({'font-size':'22px','display':'inline-block','height':'40px','line-height':'40px','margin':'0 5px'});
        $('#ifkdySearchBtn').css({'font-size':'22px','display':'inline-block','height':'40px','line-height':'40px','margin':'0 5px'});
    	curWords = mgTitle.text();
        if(curWords.indexOf("第") >= 0 && curWords.indexOf("集") >= 0)
        {
             curWords = curWords.substring(0,curWords.indexOf("第"));
        }
        if(curWords.indexOf("：") >= 0 )
        {
             curWords = curWords.substring(0,curWords.indexOf("："));
        }

       $('#ifkdySearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
    }
    //搜狐
    if(reSH.test(videoSite)){
        var shTitle = $('.player-top-info-name');
        shTitle.append(vipBtn).append(mSearchBtn);
        shTitle.find('h2').css({'float':'left'});
        $('#ifkdyVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        $('#ifkdySearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        curWords = shTitle.find('h2').text();
        $('#ifkdySearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
    }
    //A站
    if(reAF.test(videoSite)){
        var acTitle = $('.head').find('.title');
        acTitle.append(vipBtn);
        $('#ifkdyVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
    }
    //B站
    if(reBL.test(videoSite)){
        var biliTitle = $('.v-title').find('h1');
        biliTitle.after(vipBtn);
        biliTitle.css({'float':'left','margin-right':'0'});
        $('#ifkdyVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
    }
    //pptv
    if(rePP.test(videoSite)){
        var pptvTitle = $('.title_video').find('h3');
        pptvTitle.after(vipBtn).after(mSearchBtn);
        $('#ifkdyVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        $('#ifkdySearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        curWords = pptvTitle.text();
        $('#ifkdySearchBtn').attr('href','http://noad.pigguli.com/search/' + curWords + '.html');
    }
    
    $('#ifkdyVipBtn').on('click',function(){
        curPlaySite = window.location.href;
        window.location.href = 'http://vipjiexi.pigguli.com/index.php?url=' + curPlaySite;
    });
})();
