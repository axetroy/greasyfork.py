// ==UserScript==
// @name         全网VIP解析（2018-10-19）
// @namespace    viptest
// @version      2.0.1
// @description  新版改为悬浮按钮，就一个圆形按钮，没有多余的菜单，感谢作者sonimei134的脚本，因此做出了修改，强迫症请见谅！支持优酷、爱奇艺、乐视、腾讯、土豆、芒果、搜狐、pptv、华数、1905、A站等主流网站，接口是使用别人的，如果有广告请勿相信。关于电视剧选集问题：每次选集大多需要刷新页面。
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
// @grant       unsafeWindow
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    var curPlaySite = window.location.href;
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
    var reWs =/wasu/i;
    var reYYT = /yinyuetai/i;
    var vipBtn = '<a id="pupudyBtn" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;" target="_blank">VIP解析</a>';
    //华数
    if(reWs.test(curPlaySite)){
        var wasuTitle = $('#play_vod_hits');
        wasuTitle.append(vipBtn);
        $('#pupudyBtn').css({'font-weight':'bold','font-size':'14px','display':'inline-block','height':'32px','line-height':'32px','margin':'0 5px'});
        $('#pupudyBtn').on('click',function(){
        curPlaySite = window.location.href;
        window.open('http://miaomiaoai.cn/vip/play.html?url=' + curPlaySite);//接口失效，在这里更换
    });
    }
    if(reYk.test(curPlaySite)||reAqy.test(curPlaySite)||reAqy.test(curPlaySite)||reLS.test(curPlaySite)||reTX.test(curPlaySite)||reTD.test(curPlaySite)||reMG.test(curPlaySite)||reSH.test(curPlaySite)||reAF.test(curPlaySite)||reBL.test(curPlaySite)||reYJ.test(curPlaySite)||rePP.test(curPlaySite)||reYYT.test(videoSite)){

    //这部分修改了作者sonimei134提供的代码
         var sidenav = '<svg width="0" height="0"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix><feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite></filter></defs></svg><div class="aside-nav bounceInUp animated" id="aside-nav"><label for="" class="aside-menu" title="按住拖动，双击播放"><a data-cat="search" class="aside-menu" href="javascript:void(0)">VIP</a></label></div>';
        $("body").append(sidenav).append($('<link rel="stylesheet" href="https://tv.wandhi.com/static/style/asidenav.css">')).append($('<link rel="stylesheet" href="https://cdn.bootcss.com/layer/3.1.0/theme/default/layer.css">'));
        $("body .aside-nav").css({
            "background-color":"transparent",
        });
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
        $(document).ready(function(){
            var touchtime = new Date().getTime();

        $('body').on("click",function(){
                if( new Date().getTime() - touchtime < 500 ){
                    window.open('http://miaomiaoai.cn/vip/play.html?url='+ curPlaySite);//接口失效，在这里更换
        }else{
            touchtime = new Date().getTime();
        }
    });
});
    }
})();