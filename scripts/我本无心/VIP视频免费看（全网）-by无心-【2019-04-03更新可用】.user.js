// ==UserScript==
// @name         VIP视频免费看（全网）-by无心-【2019-04-03更新可用】
// @namespace    http://www.luckyblank.cn/vip_videos/
// @version      20.19.04.03
// @description  【若接口失效可进群反馈！】【新增插件下载】【新增接口大全】【新增音乐解析】【新增悬浮球】【多线解析】在视频标题旁上红色字体显示网站解析、接口解析、直播解析、音乐解析、我要反馈等按钮.采用网站一站式解析和多接口集成的方式直接调用接口，接口全部亲自测试过，同时接口支持长期的更新替换工作。在保证接口解析质量的前提下，不断地优化界面以及提高用户使用体验。因为只专注于vip影视解析，所以更专业更值得信赖。注：接口全部来自该网站：http://www.luckyblank.cn/vip_videos。Watch VIP movies for free, using website parsing and interface parsing. Is it more trustworthy because it focuses on parsing?
// @author       我本无心
// @icon         http://www.luckyblank.cn/jiaoben/favorite.ico
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
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.wasu.cn/Play/show/*
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM_getValue
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @require      https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js
// @require      https://cdn.bootcss.com/clipboard.js/1.5.16/clipboard.min.js
// @require      https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js


// ==/UserScript==
(function() {
    'use strict';
    var curPlaySite = '';
    var curWords = '';
    var html='';
    var name='';
    var videoSite = window.location.href;
    var currentUrl = window.location.href;
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
    var jkBtn5 = '<a id="jiekouBtn5"  target="_blank" style="cursor:pointer;text-decoration:none;color:red;padding:0 3px;border:1px solid red;">网站解析</a>';
    var jkBtn1 = '<a id="jiekouBtn1" target="_blank" style="cursor:pointer;text-decoration:none;color:red;padding:0 3px;border:1px solid red;">接口解析</a>';
    var jkBtn2 = '<a id="jiekouBtn2" target="_blank" style="cursor:pointer;text-decoration:none;color:red;padding:0 3px;border:1px solid red;">直播解析</a>';
    var jkBtn3 = '<a id="jiekouBtn3" target="_blank" style="cursor:pointer;text-decoration:none;color:red;padding:0 3px;border:1px solid red;">音乐解析</a>';
    var jkBtn4 = '<a id="jiekouBtn4" target="_blank" style="cursor:pointer;text-decoration:none;color:red;padding:0 3px;border:1px solid red;">问题反馈</a>';
    if(reAqy.test(videoSite)||reLS.test(videoSite)||reTX.test(videoSite)||reTD.test(videoSite)||reMG.test(videoSite)||reSH.test(videoSite) ||reAF.test(videoSite)||reBL.test(videoSite)||rePP.test(videoSite)||reYk.test(videoSite)||reYYT.test(videoSite)){

        window.q = function(cssSelector) {return document.querySelector(cssSelector);};
        var intervalId=null;var ischeck=false;var queryyhq="";
        // 影视地址检测
        //if(WYYY_RE.test(videoSite)||QQYY_RE.test(videoSite)||KGYY_RE.test(videoSite)||KWYY_RE.test(videoSite)||XMYY_RE.test(videoSite)||BDYY_RE.test(videoSite)||QTYY_RE.test(videoSite)||LZYY_RE.test(videoSite)||MGYY_RE.test(videoSite)||XMLYYY_RE.test(videoSite)||YK_RE.test(videoSite)||AQY_RE.test(videoSite)||LS_RE.test(videoSite)||TX_RE.test(videoSite)||TD_RE.test(videoSite)||MG_RE.test(videoSite)||SH_RE.test(videoSite)||AF_RE.test(videoSite)||BL_RE.test(videoSite)||YJ_RE.test(videoSite)||PP_RE.test(videoSite)||YYT_RE.test(videoSite)){
        var sidenav = '<div class="aside-nav bounceInUp animated" id="aside-nav"><label for="" class="aside-menu" title="\u62d6\u52a8\u9f20\u6807\u79fb\u52a8">VIP</label><a href="javascript:void(0)" title="\u70b9\u6b64\u8fdb\u884c\u7f51\u7ad9\u89e3\u6790" data-cat="search" class="menu-item menu-line menu-first">\u7f51\u7ad9<br>\u89e3\u6790</a><a href="javascript:void(0)" title="\u8fd9\u662f\u5f71\u89c6\u63a5\u53e3\uff0c\u4e13\u95e8\u7528\u4e8e\u89e3\u6790\u0076\u0069\u0070\u89c6\u9891\uff01" data-cat="process" class="menu-item menu-line menu-second">\u5f71\u89c6<br>\u63a5\u53e3</a><a href="javascript:void(0)" title="\u8fd9\u662f\u97f3\u4e50\u63a5\u53e3\uff0c\u4e13\u95e8\u7528\u4e8e\u89e3\u6790\u97f3\u4e50\uff01" data-cat="tb" class="menu-item menu-line menu-third">\u97f3\u4e50<br>\u63a5\u53e3</a><a href="javascript:void(0)" title="\u0051\u0051\u7fa4\uff1a\u0039\u0034\u0031\u0039\u0030\u0035\u0034\u0033\u0034\u0020\u6b22\u8fce\u52a0\u5165\uff01" data-cat="music" class="menu-item menu-line menu-fourth">\u8fdb\u7fa4<br>\u53cd\u9988</a><a href="javascript:void(0)" title="\u8fd9\u662f\u63d2\u4ef6\u533a\uff0c\u5728\u8fd9\u91cc\u4f60\u53ef\u4ee5\u627e\u5230\u5404\u79cd\u597d\u73a9\u7684\u6d4f\u89c8\u5668\u63d2\u4ef6\uff01" data-cat="jingxuan" class="menu-item menu-line menu-fifth">\u63d2\u4ef6<br>\u4e0b\u8f7d</a><a href="javascript:void(0)" title="\u8fd9\u662f\u63a5\u53e3\u5927\u5168\uff0c\u6709\u4e30\u5bcc\u7684\u63a5\u53e3\u8ba9\u4f60\u66ff\u6362\uff01" data-cat="help" class="menu-item menu-line menu-sixth">\u63a5\u53e3<br>\u5927\u5168</a></div>';
        sidenav+='<section class="ch1 doudong"> <a href="javascript:void(0)" data-cat="tmall1111" target="_blank" title="free"></a></section>';
        $("body").append(sidenav).append($('<link rel="stylesheet" href="//dy.51yfx.com/static/css/videoparse.css?v=1.1">'));
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
        //jx1
        $('body').on('click', '[data-cat=process]', function () {
            window.open('http://www.luckyblank.cn/wuxinjx/?url=' + videoSite);
        });
        //wangzhan
        $('body').on('click', '[data-cat=search]', function () {
            window.open('http://www.luckyblank.cn/vip_videos');
        });
        //jx2
        $('body').on('click', '[data-cat=tb]', function () {
            window.open('http://tool.aibangxiang.com/tool/music/');
        });
        //jiaqun
        $('body').on('click', '[data-cat=music]', function () {
            window.open('//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');
        });
        //jx4
        $('body').on('click', '[data-cat=jingxuan]', function () {
            window.open('https://www.lanzous.com/b565534');
        });
        //jx3
        $('body').on('click', '[data-cat=help]', function () {
            window.open('http://www.luckyblank.cn');
        });
        //free
        $('body').on('click', '[data-cat=tmall1111]', function () {

            window.open('http://www.luckyblank.cn');
        });
        function timerDoOnce(node, functionName, checkTime){
            var tt = setInterval(function(){
                if(document.querySelector(node) != null) {
                    clearInterval(tt);
                    functionName();
                }
            }, checkTime);
        }
        function addStyle(css) {
            var pi = document.createProcessingInstruction(
                'xml-stylesheet',
                'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
            );
            return document.insertBefore(pi, document.documentElement);
        }
        function GetUrlParam(paraName) {
            var url = window.location.href;
            var arrObj = url.split("?");

            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;

                for (var i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");

                    if (arr != null && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return "";
            }
            else {
                return "";
            }
        }


        // 爱奇艺
        if(reAqy.test(videoSite)){
            $('.qy-player-tag').append(jkBtn5).append(jkBtn1).append(jkBtn2).append(jkBtn3).append(jkBtn4);
            $('#jiekouBtn5').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 3px'});
            $('#jiekouBtn1').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 3px'});
            $('#jiekouBtn2').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 3px'});
            $('#jiekouBtn3').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 3px'});
            $('#jiekouBtn4').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20x','margin':'0 3px'});
            curPlaySite = window.location.href;
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
            $('#jiekouBtn1').attr('href','http://www.luckyblank.cn/wuxinjx/?url=' + curPlaySite);//jiekou
            $('#jiekouBtn2').attr('href','http://www.cietv.com/images/img/100/');//zhibo
            $('#jiekouBtn3').attr('href','http://tool.aibangxiang.com/tool/music/');//yinyue
            $('#jiekouBtn4').attr('href','//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');//fankui

        }
        // 乐视
        if(reLS.test(videoSite)){
            $('.briefIntro_tit').append(jkBtn5).append(jkBtn1).append(jkBtn2).append(jkBtn3).append(jkBtn4);
            $('#jiekouBtn5').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 1px'});
            $('#jiekouBtn1').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 1px'});
            $('#jiekouBtn2').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 1px'});
            $('#jiekouBtn3').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 1px'});
            $('#jiekouBtn4').css({'font-size':'10px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 1px'});
            curPlaySite = window.location.href;
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
            $('#jiekouBtn1').attr('href','http://www.luckyblank.cn/wuxinjx/?url=' + curPlaySite);//jiekou
            $('#jiekouBtn2').attr('href','http://www.cietv.com/images/img/100/');//zhibo
            $('#jiekouBtn3').attr('href','http://tool.aibangxiang.com/tool/music/');//yinyue
            $('#jiekouBtn4').attr('href','//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');//fankui

        }
        // 腾讯
        if(reTX.test(videoSite)){
            var qqTitle = $('.mod_intro').find('.video_title');
            qqTitle.eq(0).after(jkBtn4).after(jkBtn3).after(jkBtn2).after(jkBtn1).after(jkBtn5);
            $('#jiekouBtn5').css({'font-size':'15px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn1').css({'font-size':'15px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn2').css({'font-size':'15px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn3').css({'font-size':'15px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn4').css({'font-size':'15px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            curPlaySite = window.location.href;
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
            $('#jiekouBtn1').attr('href','http://www.luckyblank.cn/wuxinjx/?url=' + curPlaySite);//jiekou
            $('#jiekouBtn2').attr('href','http://www.cietv.com/images/img/100/');//zhibo
            $('#jiekouBtn3').attr('href','http://tool.aibangxiang.com/tool/music/');//yinyue
            $('#jiekouBtn4').attr('href','//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');//fankui
        }
        // 土豆
        if(reTD.test(videoSite)){
            $('.td-playbase').append(jkBtn5);
            $('#jiekouBtn5').css({'font-size':'18px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px'});
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
        }
        // 芒果
        if(reMG.test(videoSite)){
            var mgTitle = $('.v-panel-title');
            mgTitle.after(jkBtn4).after(jkBtn3).after(jkBtn2).after(jkBtn1).after(jkBtn5);
            mgTitle.css({'float':'left','margin-right':'0'});
            $('#jiekouBtn5').css({'font-size':'20px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 3px'});
            $('#jiekouBtn1').css({'font-size':'20px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 3px'});
            $('#jiekouBtn2').css({'font-size':'20px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 3px'});
            $('#jiekouBtn3').css({'font-size':'20px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 3px'});
            $('#jiekouBtn4').css({'font-size':'20px','display':'inline-block','height':'30px','line-height':'30px','margin':'0 3px'});
            curPlaySite = window.location.href;
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
            $('#jiekouBtn1').attr('href','http://www.luckyblank.cn/wuxinjx/?url=' + curPlaySite);//jiekou
            $('#jiekouBtn2').attr('href','http://www.cietv.com/images/img/100/');//zhibo
            $('#jiekouBtn3').attr('href','http://tool.aibangxiang.com/tool/music/');//yinyue
            $('#jiekouBtn4').attr('href','//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');//fankui
        }
        // 搜狐
        if(reSH.test(videoSite)){
            var shTitle = $('.player-top-info-name');
            shTitle.after(jkBtn4).after(jkBtn3).after(jkBtn2).after(jkBtn1).after(jkBtn5);
            shTitle.find('h2').css({'float':'left'});
            $('#jiekouBtn5').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn1').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn2').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn3').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn4').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            curPlaySite = window.location.href;
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
            $('#jiekouBtn1').attr('href','http://www.luckyblank.cn/wuxinjx/?url=' + curPlaySite);//jiekou
            $('#jiekouBtn2').attr('href','http://www.cietv.com/images/img/100/');//zhibo
            $('#jiekouBtn3').attr('href','http://tool.aibangxiang.com/tool/music/');//yinyue
            $('#jiekouBtn4').attr('href','//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');//fankui
        }
        // acfun
        if(reAF.test(videoSite)){
            var acTitle = $('.head').find('.title');
            acTitle.append(jkBtn5);
            $('#jiekouBtn5').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 3px'});
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
        }
        // bilibili
        if(reBL.test(videoSite)){
            var biliTitle = $('.v-title').find('h1');
            biliTitle.after(jkBtn5);
            biliTitle.css({'float':'left','margin-right':'0'});
            $('#jiekouBtn5').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
        }
        // pptv
        if(rePP.test(videoSite)){
            var pptvTitle = $('.title_video').find('h3');
            pptvTitle.after(jkBtn4).after(jkBtn3).after(jkBtn2).after(jkBtn1).after(jkBtn5);
            $('#jiekouBtn5').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn1').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn2').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn3').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});
            $('#jiekouBtn4').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 3px'});

            curPlaySite = window.location.href;
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
            $('#jiekouBtn1').attr('href','http://www.luckyblank.cn/wuxinjx/?url=' + curPlaySite);//jiekou
            $('#jiekouBtn2').attr('href','http://www.cietv.com/images/img/100/');//zhibo
            $('#jiekouBtn3').attr('href','http://tool.aibangxiang.com/tool/music/');//yinyue
            $('#jiekouBtn4').attr('href','//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');//fankui
        }
        if(reYk.test(videoSite)){
            var youkuTitle = $('#subtitle');
            if(youkuTitle.length !== 0){
                youkuTitle.after(jkBtn4).after(jkBtn3).after(jkBtn2).after(jkBtn1).after(jkBtn5);
                $('#jiekouBtn5').css({'font-size':'10px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});
                $('#jiekouBtn1').css({'font-size':'10px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});
                $('#jiekouBtn2').css({'font-size':'10px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});
                $('#jiekouBtn3').css({'font-size':'10px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});
                $('#jiekouBtn4').css({'font-size':'10px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});

                curPlaySite = window.location.href;
                $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
                $('#jiekouBtn1').attr('href','http://www.luckyblank.cn/wuxinjx/?url=' + curPlaySite);//jiekou
                $('#jiekouBtn2').attr('href','http://www.cietv.com/images/img/100/');//zhibo
                $('#jiekouBtn3').attr('href','http://tool.aibangxiang.com/tool/music/');//yinyue
                $('#jiekouBtn4').attr('href','//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');//fankui
            }else{
                $('.title').after(jkBtn4).after(jkBtn3).after(jkBtn2).after(jkBtn1).after(jkBtn5);
                $('#jiekouBtn5').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});
                $('#jiekouBtn1').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});
                $('#jiekouBtn2').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});
                $('#jiekouBtn3').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});
                $('#jiekouBtn4').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 3px','vertical-align':'bottom'});

                curPlaySite = window.location.href;
                $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
                $('#jiekouBtn1').attr('href','http://www.luckyblank.cn/wuxinjx/?url=' + curPlaySite);//jiekou
                $('#jiekouBtn2').attr('href','http://www.cietv.com/images/img/100/');//zhibo
                $('#jiekouBtn3').attr('href','http://tool.aibangxiang.com/tool/music/');//yinyue
                $('#jiekouBtn4').attr('href','//shang.qq.com/wpa/qunwpa?idkey=959be373da1fb42096c6391a8f182dad15a7d567f136a99afa991a0975c677be');//fankui
            }
        }
        // 音悦台
        if(reYYT.test(videoSite)){
            var yytTitle = $('.videoName');
            yytTitle.append(jkBtn5);
            $('#jiekouBtn5').css({'font-weight':'bold','font-size':'14px','display':'inline-block','height':'32px','line-height':'32px','margin':'0 3px'});
            $('#jiekouBtn5').attr('href','http://www.luckyblank.cn/vip_videos/');//wangzhan
        }
    }
})();