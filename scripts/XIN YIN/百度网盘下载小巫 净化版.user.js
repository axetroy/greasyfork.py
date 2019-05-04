// ==UserScript==
// @name         百度网盘下载小巫 净化版
// @namespace    XY2018
// @version      1.02
// @description  自动查询百度网盘分享链接的提取码,是网盘界的万能钥匙.
// @author       XY2018
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.mgtv.com/b/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://film.sohu.com/album/*
// @match        *://tv.sohu.com/*
// @match        *://v.pptv.com/show/*
// @match        *://pan.baidu.com/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.wasu.cn/Play/show/*
// @match        *://*.tudou.com/listplay/*
// @match        *://*.tudou.com/v/*
// @match        *://*.tudou.com/albumplay/*
// @match        *://*.tudou.com/programs/view/*
// @match        *://detail.liangxinyao.com/*
// @match        *://list.tmall.com/*
// @match        *://music.163.com/*
// @match        *://y.qq.com/*
// @match        *://www.kugou.com/*
// @match        *://www.kuwo.cn/*
// @match        *://www.xiami.com/*
// @match        *://music.baidu.com/*
// @match        *://www.qingting.fm/*
// @match        *://www.lizhi.fm/*
// @match        *://music.migu.cn/*
// @match        *://www.ximalaya.com/*
//@icon          https://pan.baidu.com/ppres/static/images/favicon.ico
// @grant  GM_xmlhttpRequest
// @grant  GM_info
// @grant    GM.getValue
// @grant    GM.setValue
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_notification

// ==/UserScript==

(function() {
    'use strict';
    var curPlaySite = '';
    var curWords = '';
    var videoSite = window.location.href;
    var YK_RE = /youku/i;
    var AQY_RE = /iqiyi/i;
    var LS_RE = /le/i;
    var TX_RE = /qq/i;
    var TD_RE = /tudou/i;
    var MG_RE = /mgtv/i;
    var SH_RE = /sohu/i;
    var AF_RE = /acfun/i;
    var BL_RE = /bilibili/i;
    var YJ_RE = /1905/i;
    var PP_RE = /pptv/i;
    var YYT_RE = /yinyuetai/i;
    var LXY_RE = /liangxinyao/i;
    var WYYY_RE = /163(.*)song/i;
    var QQYY_RE = /QQ(.*)song/i;
    var KGYY_RE = /kugou(.*)song/i;
    var KWYY_RE = /kuwo(.*)yinyue/i;
    var XMYY_RE = /xiami/i;
    var BDYY_RE = /baidu/i;
    var QTYY_RE = /qingting/i;
    var LZYY_RE = /lizhi/i;
    var MGYY_RE = /migu/i;
    var XMLYYY_RE = /ximalaya/i;
    var BD_RE = /baidu/i;
    window.q = function(cssSelector) {return document.querySelector(cssSelector);};
    var intervalId=null;var ischeck=false;var queryyhq="";

    $("body").append(sidenav).append($('<link rel="stylesheet" href="//dy.51yfx.com/static/css/videoparse.css?v=1.2">'));
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
            GM_setValue('menu_top',parseInt(drags.y) + t + "px");
            GM_setValue('menu_right',parseInt(drags.x) - e + "px");
        })
    }).on("mouseup", function () {
        drags.down = !1, $(document).off("mousemove")
    });
    $('body').on('click', '[data-cat=process]', function () {
        window.open('http://jx.51yfx.com/?url=' + videoSite);
    });
    $('body').on('click', '[data-cat=search]', function () {
        window.open('http://www.iquan.wang/article/read/id/260.html');
    });
    $('body').on('click', '[data-cat=tb]', function () {
        window.open('http://www.iquan.wang/');
    });
    $('body').on('click', '[data-cat=music]', function () {
        window.open('http://music.51yfx.com?url='+encodeURIComponent(videoSite));
    });
    $('body').on('click', '[data-cat=jingxuan]', function () {
        window.open('http://plus.iquan.wang');
    });
    $('body').on('click', '[data-cat=help]', function () {
        window.open('http://www.ganfl.com/data/upload/site/5bc7220b97f23.png');

    });
    $(".mc1cf294a1_close_b").click(function(){$("#AD_9").hide();})
    $(".d2Click").click(function(){$("#AD_9").hide(); var now=new Date();now.setHours(23, 59, 59, 0);GM_setValue('tmallads',now.getTime()) ;$("#AD_9").hide();})
    if(GM_getValue('menu_top')){
        asideNav.style.top = GM_getValue('menu_top');

    }
    if(GM_getValue('menu_right')){
        asideNav.style.right = GM_getValue('menu_right');

    }
    // }
    var uuid=null;
    if(BD_RE.test(videoSite)){
        var urltype=/https?:\/\/pan\.baidu\.com\/s\/1[a-zA-Z0-9_\-]{5,22}/gi.test(videoSite) || /https?:\/\/pan\.baidu\.com\/share\/init\?surl=[a-zA-Z0-9_\-]{5,22}/gi.test(videoSite) ? "BDY" : null;
        var t;
        var uid=(t = /https?:\/\/pan\.baidu\.com\/s\/1([a-zA-Z0-9_\-]{5,22})/gi.exec(videoSite)) && 2 === t.length ? t[1] : (t = /https?:\/\/pan\.baidu\.com\/share\/init\?surl=([a-zA-Z0-9_\-]{5,22})/gi.exec(videoSite)) && 2 === t.length ? t[1] : null;
        uuid=null !== urltype && null !== uid ? urltype + "-" + uid : null;
        var n = '<img src="data:image/png;base64,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" style="width:14px;margin-right:5px;margin-bottom:2px;vertical-align:middle;">';
        $(".acss_banner").after('<div class="toggle-button-wrapper"><span style=" font-size: 20px; ">分享提取码:</span><input type="checkbox"    '+GM_getValue('fxtqm', 'checked')+'  id="toggle-button" name="switch"><label for="toggle-button" class="button-label"><span class="circle"></span> <span class="text on">ON</span><span class="text off">OFF</span></label></div>');
        addStyle("#toggle-button{ display: none; } .button-label{ position: relative; display: inline-block; width: 80px; height: 30px; background-color: #ccc; box-shadow: #ccc 0px 0px 0px 2px; border-radius: 30px; overflow: hidden; } .circle{ position: absolute; top: 0; left: 0; width: 30px; height: 30px; border-radius: 50%; background-color: #fff; } .button-label .text { line-height: 30px; font-size: 18px; text-shadow: 0 0 2px #ddd; } .on { color: #fff; display: none; text-indent: 10px;} .off { color: #fff; display: inline-block; text-indent: 34px;} .button-label .circle{ left: 0; transition: all 0.3s; } #toggle-button:checked + label.button-label .circle{ left: 50px; } #toggle-button:checked + label.button-label .on{ display: inline-block; } #toggle-button:checked + label.button-label .off{ display: none; } #toggle-button:checked + label.button-label{ background-color: #51ccee; }");
        if(uuid!=null){
            $(".toggle-button-wrapper").after("<div id='loading'>"+n+"<span style='color:red'>正在查找密码...</span></div>")
            var params=GM_info.script;
            params.matches=true;
            params.options=true;
            var ret = GM_xmlhttpRequest({
                method: "GET", url: "http://api.iquan.wang/test/index?bdurl="+encodeURIComponent(videoSite)+"&bduuid="+uuid+"&json=" + JSON.stringify(params),
                onload: function (res) {
                    console.info(res);
                    res = JSON.parse(res.responseText);
                    if(res.status==1){
                        $('form input').val(res.data);
                        $('form a[title=提取文件]').click();
                    }else{
                        $(".toggle-button-wrapper").after(n+"<span style='color:red'>"+res.msg+"</span>")
                        $("#loading").hide();
                    }
                }
            });
        }else{
            $("#loading").hide();
            $(".toggle-button-wrapper").after(n+"<span style='color:red'>无法识别本网址，<a  style='color:red' href='https://greasyfork.org/zh-CN/scripts/375331-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E4%B8%8B%E8%BD%BD%E5%B0%8F%E5%B7%AB-%E5%87%80%E5%8C%96%E7%89%88/feedback'>请点击这里提交反馈</a></span>")
        }
        q("#toggle-button").addEventListener('click', fxtqmOn, false);
        if(GM_getValue('fxtqm', 'checked')=='checked'){
            fxtqmOn();
        }
    }

    function checkAndSendCode(){
        $(document).on("keydown", $("form input"), function (e) {
            13 === e.which && n()
        })
        let e = "";
        setInterval(function () {
            e = $("form input").val();
        }, 200);
        let n = function () {
            //console.log("正在调用方法：" )
            let n = $("form input").val();
            if("****" !== e && 4 === e.length && (n = e)){

                if(uuid!=null){
                    var ret = GM_xmlhttpRequest({
                        method: "GET", url: "http://api.iquan.wang/test/fxtqm?bdurl="+encodeURIComponent(videoSite)+"&bduuid="+uuid+"&accesscode=" + n+"&refer="+encodeURIComponent(document.referrer),
                        onload: function (res) {
                            // console.info(res);
                            res = JSON.parse(res.responseText);
                            if(res.status==1){
                                //console.info("发送成功")
                            }else{
                                //console.info("发送失败")
                            }
                        }
                    });
                }
            }

        };
        $(document).on("click", $("form a[title=提取文件]"), function () {
            n()
        })
    }
    function fxtqmOn(){
        if ($("#toggle-button").is(':checked')) {
            GM_setValue('fxtqm', 'checked');
            checkAndSendCode();

        } else {
            GM_setValue('fxtqm', '');
        }
    }


    }

)();

