// ==UserScript==
// @name        全网VIP会员视频免费看 2019年1月3日长期稳定有效
// @namespace    https://zhangwenbing.com/
// @version      2.0.8
// @description    破解全网VIP会员视频
// @author       bing
// @match        *://*.iqiyi.com/*
// @match        *://*.youku.com/*
// @match        *://*.le.com/*
// @match        *://*.letv.com/*
// @match        *://v.qq.com/*
// @match        *://*.tudou.com/*
// @match        *://*.mgtv.com/*
// @match        *://film.sohu.com/*
// @match        *://tv.sohu.com/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/*
// @match        *://vip.1905.com/play/*
// @match        *://*.pptv.com/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.fun.tv/vplay/*
// @match        *://*.wasu.cn/Play/show/*
// @exclude      *://*.bilibili.com/blackboard/*
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    try{
        document.querySelector('#widget-dramaseries').addEventListener('click', function getLink (e){
            var target=e.target.parentNode.tagName=="LI"?e.target.parentNode:(e.target.parentNode.parentNode.tagName=="LI"?e.target.parentNode.parentNode:e.target.parentNode.parentNode.parentNode);
            if(target.tagName!="LI")return;
            location.href=target.childNodes[1].href;
        });
    }
    catch(exception){

    }



    var div=document.createElement("div");
    div.innerHTML='<div id="analysis"><a style="color:#008000;font-size:28px" href="javascript:window.open(\'http://zhangwenbing.com/tools/video/?url=\'+location.href)">▷</a></div>';
    document.body.appendChild(div);
    document.getElementById('analysis').style.cssText='z-index:99999;position: fixed;top:200px;left:0';
})();