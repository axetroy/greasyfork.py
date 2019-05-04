// ==UserScript==
// @name        勤勤学长-视频VIP解析插件-免会员在线播放付费视频 2018.08.28
// @namespace    http://www.11ak.cn/vip/
// @icon         https://ucenter.bbs.360.cn/avatar.php?uid=22998465&size=big
// @version      1.4
// @description  勤勤学长-视频VIP解析插件；支持破解直接播放【爱奇艺，优酷视频，乐视TV，腾讯视频，土豆视频，搜狐视频，1905影院】，点击就能直接播放。
// @author       勤勤学长qq318692996
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/w_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.tudou.com/listplay/*
// @match        *://vip.1905.com/play/*
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
// @match        *://pan.baidu.com/disk/home*
// @match        *://yun.baidu.com/disk/home*
// @match        *://pan.baidu.com/s/*
// @match        *://yun.baidu.com/s/*
// @match        *://pan.baidu.com/share/link*
// @match        *://yun.baidu.com/share/link*
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/1.5.16/clipboard.min.js
// @grant        GM_setClipboard
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict';
    var currentUrl = window.location.href;
    var reYk = /youku/i;
    var reAqy = /iqiyi/i;
    var reLS = /le.com/i;
    var reTX = /qq/i;
    var reTD = /tudou/i;
    var reMG = /mgtv/i;
    var reSH = /sohu/i;
    var reAF = /acfun/i;
    var reBL = /bilibili/i;
    var reYJ = /1905/i;
    var rePP = /pptv/i;
    var reYYT = /yinyuetai/i;
    var reTaoBao = /taobao/i;
    var reTmall = /tmall/i;
    var reJd = /jd/i;
    var html='';
    var name='';
    if (reAqy.test(currentUrl) || reLS.test(currentUrl) || reTX.test(currentUrl) || reTD.test(currentUrl) || reMG.test(currentUrl) || reSH.test(currentUrl) || rePP.test(currentUrl) || reYk.test(currentUrl) || reYJ.test(currentUrl)) {
        var sidenav = '<div class="aside-nav bounceInUp animated" id="aside-nav"><label for="" class="aside-menu" title="按住拖动">VIP</label><a href="javascript:void(0)" title="电影搜索" data-cat="search" class="menu-item menu-line menu-first">电影<br>搜索</a><a href="javascript:void(0)" title="视频解析" data-cat="process" class="menu-item menu-line menu-second">视频<br>解析</a></div>';
        $("body").append(sidenav).append($('<link rel="stylesheet" href="//tv.wandhi.com/static/style/asidenav.css">'));
        var ua = navigator.userAgent;
        /Safari|iPhone/i.test(ua) && 0 == /chrome/i.test(ua) && $("#aside-nav").addClass("no-filter");
        var drags = { down: !1, x: 0, y: 0, winWid: 0, winHei: 0, clientX: 0, clientY: 0 }, asideNav = $("#aside-nav")[0], getCss = function (a, e) { return a.currentStyle ? a.currentStyle[e] : document.defaultView.getComputedStyle(a, !1)[e] };
        $("#aside-nav").on("mousedown", function (a) {
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
        }).on("mouseup", function () {
            drags.down = !1, $(document).off("mousemove")
        });
        $('body').on('click', '[data-cat=process]', function () {
            window.open('http://www.11ak.cn/vip/?url=' + currentUrl);
        });
        $('body').on('click', '[data-cat=search]', function () {
            window.open('http://dianying.11ak.cn/');
        });
    }
})();