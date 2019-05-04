// ==UserScript==
// @name         【2019年4月15日更新】网盘万能钥匙，自动查询百度网盘分享链接的提取码,全网VIP视频解析播放,全网付费音乐免费下载,淘宝、拼多多大额购物优惠券领取，支持历史价格查询
// @namespace    http://www.17gouwu.cn/
// @connect api.ganfl.com
// @connect api.iquan.wang
// @version      3.1.8
// @description  自动查询百度网盘分享链接的提取码,是网盘界的万能钥匙,全网VIP视频解析播放,全网付费音乐免费下载,淘宝、拼多多大额购物优惠券领取，支持商品比价,查询历史价格查询,使用优惠券购物,脚本开发者会获得些许返利.支持油猴、暴力猴插件。
// @author       一起购物
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
// @match        *://item.taobao.com/*
// @match        *://detail.tmall.com/*
// @match        *://detail.liangxinyao.com/*
// @match        *://detail.tmall.hk/*
// @match        *://s.taobao.com/*
// @match        *://ai.taobao.com/search/*
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
// @match        http://plus.iquan.wang/setting.html
//@icon          http://www.ganfl.com/favicon.ico
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
    var TB_RE = /taobao/i;
    var TM_RE = /tmall/i;
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
    var SETTING_RE=/iquan.wang/i
    window.q = function(cssSelector) {return document.querySelector(cssSelector);};
    var intervalId=null;var ischeck=false;var queryyhq="";
    if(SETTING_RE.test(videoSite)){
        //
        var ids=['tmsetting_ads'];var names=['广告开关'];
        var setting='';
        for(var i=0;i<ids.length;i++){
            setting+='<div class="am-form-group"> <label for="'+ids[i]+'" class="am-u-sm-3 am-form-label">'+names[i]+'</label> <div class="am-u-sm-9"> <div class="tpl-switch"> <input type="checkbox" id="'+ids[i]+'" class="ios-switch bigswitch tpl-switch-btn" '+GM_getValue(ids[i])+'/> <div   class="  tpl-switch-btn-view"> <div> </div> </div> </div> </div> </div>';
        }
        $("#tm_setting").append(setting);
        $(".ios-switch").click(function(){
            var  id=$(this).attr("id");
            if($(this).prop("checked")){
                GM_setValue(id,"checked");
            }else{
                GM_setValue(id,"");
            }


        })
    }
    var now=$.now();
    // 腾讯
    //if(WYYY_RE.test(videoSite)||QQYY_RE.test(videoSite)||KGYY_RE.test(videoSite)||KWYY_RE.test(videoSite)||XMYY_RE.test(videoSite)||BDYY_RE.test(videoSite)||QTYY_RE.test(videoSite)||LZYY_RE.test(videoSite)||MGYY_RE.test(videoSite)||XMLYYY_RE.test(videoSite)||YK_RE.test(videoSite)||AQY_RE.test(videoSite)||LS_RE.test(videoSite)||TX_RE.test(videoSite)||TD_RE.test(videoSite)||MG_RE.test(videoSite)||SH_RE.test(videoSite)||AF_RE.test(videoSite)||BL_RE.test(videoSite)||YJ_RE.test(videoSite)||PP_RE.test(videoSite)||YYT_RE.test(videoSite)){
    var sidenav = '<div class="aside-nav bounceInUp animated" id="aside-nav"><label for="" class="aside-menu" data-cat="gongnue" title="">菜单</label><a href="javascript:void(0)" title="支付宝最新缛羊毛活动，三天最高可得300元" data-cat="search" class="menu-item menu-line menu-first">美<br>逛</a><a href="javascript:void(0)" title="\u6ca1\u9519\uff0c\u5c31\u662f\u70b9\u6211\uff0c\u5c31\u53ef\u4ee5\u514d\u8d39\u64ad\u653e\u0056\u0049\u0050\u89c6\u9891\u4e86\u54e6\uff1f\u6211\u5389\u5bb3\u5417\u0028\u3003\u0026\u0023\u0033\u0039\u003b\u25bd\u0026\u0023\u0033\u0039\u003b\u3003\u0029" data-cat="process" class="menu-item menu-line menu-second">\u514d\u0056\u0049\u0050<br>\u64ad\u653e</a><a href="javascript:void(0)" title="\u4eb2\u7231\u7684\uff0c\u0020\u544a\u8bc9\u4f60\u54df\uff0c\u6211\u53ef\u4ee5\u514d\u8d39\u9886\u6dd8\u5b9d\u5929\u732b\u5927\u989d\u4f18\u60e0\u5238\uff0c\u7acb\u7701\u0038\u0030\u0025\uff0c\u8981\u8d2d\u7269\uff0c\u5148\u70b9\u6211\u9886\u5238\u5427\uff01\u2727\u0028\u2256\u0020\u25e1\u0020\u2256\u273f\u0020" data-cat="tb" class="menu-item menu-line menu-third">\u5927\u989d<br>\u795e\u5238</a><a href="javascript:void(0)" title="\u4e0b\u8f7d\u97f3\u4e50\u8fd8\u8981\u0056\u0049\u0050\u0028\u25bc\u30d8\u25bc\u0023\u0029\uff1f\u6211\u53c8\u53ef\u4ee5\u5e2e\u5230\u4f60\u5566\uff0c\u597d\u5f00\u68ee\u007e\u007e\u0669\u0028\u0e51\u275b\u1d17\u275b\u0e51\u0029\u06f6" data-cat="music" class="menu-item menu-line menu-fourth">\u97f3\u4e50<br>\u641c\u7d22</a><a href="javascript:void(0)" title="\u63a8\u8350\u5b89\u88c5\u4e07\u80fd\u5de5\u5177\u7bb1\u72ec\u7acb\u63d2\u4ef6\u002c\u4e0d\u4f9d\u8d56\u6cb9\u7334\u3002" data-cat="jingxuan" class="menu-item menu-line menu-fifth">帮助<br/>说明</a><a href="javascript:void(0)" title="插件设置" data-cat="help" class="menu-item menu-line menu-sixth">设<br/>置</a></div>';
    //if(GM_getValue('tmsetting_ads')=='checked'||GM_getValue('tmsetting_ads')==undefined){
    GM_xmlhttpRequest({
        method: "GET", url: "http://api.iquan.wang/test/yhhd",
        onload: function (res) {
            res = JSON.parse(res.responseText);
           
            if(res.status==1){
                var ads='<section class="ch1 doudong"> <a href="javascript:void(0)" data-cat="tmall1111" data-url="'+res.data.url+'" target="_blank" title="'+res.data.title+'"><img src="'+res.data.icon+'" ></a><a  data-cat="hidead" class="btn-close"></a></section>';
                $("body").append(ads)
            }

        }
    });


    // }
    var tongji=GM_getValue('tongji');
    if(tongji==undefined||tongji=="undefined"||tongji<now){
        var ret = GM_xmlhttpRequest({
            method: "GET", url: "http://api.iquan.wang/test/tongji?type=youhou",
            onload: function (res) {
                var now=new Date();now.setHours(23, 59, 59, 0);
                GM_setValue('tongji',now.getTime()) ;//记录超时时间
            }
        });
    }
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
        window.open('http://www.51yfx.com');
    });
    $('body').on('click', '[data-cat=tb]', function () {
        window.open('http://www.iquan.wang/');
    });
    $('body').on('click', '[data-cat=music]', function () {
        window.open('http://music.51yfx.com?type=yh&url='+encodeURIComponent(videoSite));
    });
    $('body').on('click', '[data-cat=jingxuan]', function () {
        window.open('http://plus.iquan.wang');
    });
    $('body').on('click', '[data-cat=help]', function () {
        window.open('http://plus.iquan.wang/setting.html');
    });
    
     $('body').on('click', '[data-cat=hidead]', function () {
     
$(".doudong").hide();
     });
     
    $('body').on('click', '[data-cat=tmall1111]', function () {
        var url=$(this).attr("data-url");

        window.open(url);


    });

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
            $(".toggle-button-wrapper").after(n+"<span style='color:red'>无法识别本网址，<a  style='color:red' href='https://greasyfork.org/zh-CN/scripts/370811/feedback'>请点击这里提交反馈</a></span>")
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
    //淘宝
    if(TB_RE.test(videoSite)||TM_RE.test(videoSite)||LXY_RE.test(videoSite)){
        var host = window.location.host;
        var productNm = '';
        var url = "http://www.iquan.wang/?m=search&a=index&k=";
        var label = "每日精选";
        var goodsid=GetUrlParam("id");
        var cssSelector = '';

        if (host.indexOf('item.taobao.com') >= 0) {

            //if(GM_getValue(goodsid+'_checkyhq')=='undefined'||GM_getValue(goodsid+'_checkyhq')==undefined){
            //     checkYhq(goodsid);
            // }
            productNm = $.trim($('.tb-main-title').text());
            cssSelector = '.tb-action';
            AlibabaAppendHtml( url, productNm, label,  goodsid,$(cssSelector))
        } else if (host.indexOf('detail.tmall') >= 0||host.indexOf('detail.liangxinyao') >= 0) {

            // if(GM_getValue(goodsid+'_checkyhq')=='undefined'||GM_getValue(goodsid+'_checkyhq')==undefined){
            //     checkYhq(goodsid);
            // }

            productNm = $.trim($('.tb-detail-hd h1').text());
            cssSelector = '.tb-action';
            AlibabaAppendHtml( url, productNm, label,  goodsid,$(cssSelector))
        }



    }
    function checkYhq(goodsid){
        GM_xmlhttpRequest({
            method: "GET", url: "http://api.iquan.wang/test/checkYhq?id="+goodsid,
            onload: function (res) {
                console.info(res);
                res = JSON.parse(res.responseText);
                if(res.status==1){
                    GM_setValue(goodsid+'_checkyhq','1');
                }else{
                    GM_setValue(goodsid+'_checkyhq','0');
                }
            }
        });
    }
    function checkUpdate(){

        var checkUpdate=GM_getValue('checkUpdateTime');
        var now=$.now();

        if(checkUpdate>now){
            //todo
        }else{
            GM_xmlhttpRequest({
                method: "GET", url: "http://api.iquan.wang/test/checkUpdate?version=" + GM_info.script.version,
                onload: function (res) {
                    res = JSON.parse(res.responseText);
                    console.info(res);
                    if(res.status==1){
                        notifiy( res.data.title, res.data.text, res.data.icon, res.data.click_url)
                    }
                }
            });
            GM_setValue('checkUpdateTime',$.now()+2*60*60*1000) ;//记录超时时间

        }
    }
    checkUpdate();
    function checkTs(){

        var checkTs=GM_getValue('checkTsTime');
        var now=$.now();
        if(checkTs>now){
            //todo
        }else{
            var lasttsid=GM_getValue('lasttsid');
            if( lasttsid=='undefined'||lasttsid===undefined){lasttsid=0;}

            GM_xmlhttpRequest({
                method: "GET", url: "http://api.iquan.wang/test/checkTs?id=" + lasttsid,
                onload: function (res) {
                    console.info(res)
                    res = JSON.parse(res.responseText);
                    if(res.status==1){
                        GM_setValue('lasttsid',res.data.id);
                        notifiy( res.data.title, res.data.text, res.data.icon, res.data.click_url)
                    }
                }
            });
            GM_setValue('checkTsTime',$.now()+30*60*1000) ;//记录超时时间
        }
    }
    checkTs();
    function aiTao(){

        $(".search-result-box").each(function(){
            var goodsid=$(this).attr('data-itemid');
            //$(this).find("a").attr('href','http://www.iquan.wang/jump/index/id/'+goodsid+'.html');
            //productNm = $(this).children("a:first").text();
            //$(this).after('<p style=" text-align: center; "><a style=" color: red; font-size: 20px; " href="' + url + encodeURI(productNm) + '" target="_blank">领取优惠券</a></p>');
            ischeck=true;
        });
        if(ischeck){clearInterval(intervalId)}
    }
    function sTao(){
        $.each($(".J_MouserOnverReq"),function(index){
            var goodsid=$(this).find(".pic").find("a").attr('data-nid');
            // $(this).find(".pic").find("a").attr('href','http://www.iquan.wang/jump/index/id/'+goodsid+'.html');
            //$(this).find(".title").find("a").attr('href','http://www.iquan.wang/jump/index/id/'+goodsid+'.html');
            //productNm = $.trim($(this).find(".title").text());
            //$(this).find(".title").after('<p style=" text-align: center; "><a style=" color: red; font-size: 20px; " href="' + url + encodeURI(productNm) + '" target="_blank">领取优惠券</a></p>');
            ischeck=true;
        });
        if(ischeck){clearInterval(intervalId)}
    }

    function queryData(goodID) {
        var cgoodTitle = document.title+"";
        var ret = GM_xmlhttpRequest({
            method: "GET", url: "http://api.iquan.wang/index/index?iid=" + goodID,
            onload: function (res) {
                res = JSON.parse(res.responseText);
                console.info(res);
                if(res.status==1&&res.data!=1){
                    console.info("success");
                    queryyhq= "领￥"+res.data+"元优惠券";
                }else{
                    console.info("error");
                    queryyhq= "领取优惠券";
                }
            }
        });
    }
    function AlibabaAppendHtml( url, productNm, label, goodsid,cssSelector) {
        queryData(goodsid);

        var tt = setInterval(function () {

            if ( queryyhq!="") {
                clearInterval(tt);
                if (videoSite.indexOf('taobao.com') > 0) {
                    $(cssSelector).append('<div class="div-inline"><div class="tb-btn-buy" style="padding-top:11px;"><a href="http://www.iquan.wang/jingxuan" target="_blank">' + label + '</a></div></div> <div class="div-inline"><div class="tb-btn-add" style="padding-top:11px;"><a href="' + url + encodeURI(productNm) + '" target="_blank">'+queryyhq+'</a></div></div>');
                    //$(cssSelector).append('<div class="div-inline"><div class="tb-btn-buy" style="padding-top:11px;"><a href="http://www.iquan.wang/article/read/id/260.html" target="_blank">瓜分15亿</a></div></div> <div class="div-inline"><div class="tb-btn-add" style="padding-top:11px;"><a href="http://www.ganfl.com/huodongpage" target="_blank">双十二活动攻略</a></div></div>');
                } else if (videoSite.indexOf('detail.tmall') > 0||videoSite.indexOf('detail.liangxinyao') > 0) {
                    $(cssSelector).append('<div class="div-inline"><div class="tb-btn-buy tb-btn-sku"  style="padding-top:11px;"><a href="http://www.iquan.wang/jingxuan" target="_blank">' + label + '</a></div></div> <div class="div-inline"><div class="tb-btn-basket tb-btn-sku " style="padding-top:11px;"><a href="' + url + encodeURI(productNm) + '" target="_blank">'+queryyhq+'</a></div></div>');
                    //$(cssSelector).append('<div class="div-inline"><div class="tb-btn-buy tb-btn-sku"  style="padding-top:11px;"><a href="http://www.iquan.wang/article/read/id/260.html" target="_blank">瓜分15亿</a></div></div> <div class="div-inline"><div class="tb-btn-basket tb-btn-sku " style="padding-top:11px;"><a href="http://www.ganfl.com/huodongpage" target="_blank">双十二活动攻略</a></div></div>');

                } else if (videoSite.indexOf('jd.com') > 0) {
                    $(cssSelector).append( '<a class="btn-special1 btn-lg" href="' + url + encodeURI(productNm) + '" target="_blank">' + label + '</a>');
                }
            }
        }, 50);
        var host = window.location.host;

        if (host.indexOf('item.taobao.com') >= 0||host.indexOf('detail.tmall.com') >= 0) {
            timerDoOnce("body", function(){
                var s = document.createElement('script');
                s.setAttribute('src','https://shared-https.ydstatic.com/gouwuex/ext/script/extension_3_1.js?vendor=youdao&browser=firefox');
                s.setAttribute('charset','utf-8');
                document.body.appendChild(s);
            }, 200);
            timerDoOnce(".hui-link", function(){
                var node = document.querySelector(".hui-link"); // 移除多余的广告标签
                while(node.tagName != "LI"){
                    node = node.parentNode;
                }
                node.remove();
                document.querySelector(".hui-qrcode-container").innerHTML = "美逛店长招募计划 <p><a href='http://www.51yfx.com' style='color:red !important'>自用省钱、分享赚钱！点击查看详情 </a></p>";
                $(".hui-show-long").css("min-height","0px");
                document.querySelector("a[clkaction='BAR_ONEKEY_MOD_CLICK'] div, a[clkaction='BAR_ONEKEY_MOD_CLICK_B'] div").innerHTML = "每日最热";
                document.querySelector("a[clkaction='BAR_ONEKEY_MOD_CLICK'], a[clkaction='BAR_ONEKEY_MOD_CLICK_B']").setAttribute("href", "http://www.ganfl.com/jingxuan");
                document.querySelector("a[clkaction='BAR_DEAL_MOD_CLICK']").setAttribute("href", "http://www.ganfl.com/quan");
                document.querySelector("a[clkaction='BAR_COUPON_MOD_CLICK']").setAttribute("href", "http://www.ganfl.com/");
                document.querySelector("a[clkaction='BAR_LEMALL_AD_CLICK']").setAttribute("href", "http://www.ganfl.com/");
            }, 200);
            setInterval(function(){
                // var node = document.querySelector(".youdaoGWZSTestCss").nextSibling.firstChild;
                // if(node != null){

                //     node.style = "top:0px;";

                //  }
            }, 50);
            addStyle(".hui-show-long{min-height:unset !important;margin-top: -12px;}.hui-js-close-plugin+li>div{display:none;}body{margin-top:60px !important;}div[style='z-index: 2147483647; position: fixed;']>div>table{top:0px;position: fixed;z-index: 23333333;background-color: white;}div[style='z-index: 2147483647; position: fixed;']>div{bottom:unset;}div[style='z-index: 2147483647; position: fixed;']>div>table td:nth-child(3){display:none}");
        }
    }

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
    //方法: 通用chrome通知
    function notifiy(title, body, icon, click_url) {

        var notificationDetails = {
            text: body,
            title: title,
            timeout: 0,
            highlight:true,
            image: icon,
            onclick: function () {
                window.open(click_url);
            }
        };
        GM_notification(notificationDetails);

    }


})();

