// ==UserScript==
// @name         【超级红包】
// @namespace    http://www.meilize.cn/
// @namespace    http://www.meilize.cn/app
// @version      2019.1.2.90
// @icon         http://www.meilize.cn/favicon.ico
// @supportURL   https://greasyfork.org/zh-CN/scripts/372512
// @description  大额优惠券省钱更赚钱+领取支付宝紅包+VIP视频在线解析破解去广告:通过优惠券网站查询商家设置的隐藏优惠券信息,直接领优惠券购买。在线播放vip视频；支持优酷vip，腾讯vip，爱奇艺vip，芒果vip，乐视vip等常用视频！全网音乐在线试听，支持免费下载，搜索。现已支持：网易云音乐，QQ音乐，酷狗音乐，酷我音乐，虾米音乐，百度音乐，蜻蜓FM，荔枝FM，喜马拉雅。
// @author       美逛,美丽折,美丽影院,meilize.cn
// @match        https://s.taobao.com/*
// @match        https://list.tmall.com/*
// @match        https://list.tmall.hk/*
// @match        https://detail.tmall.hk/*
// @match        https://detail.tmall.com/*
// @match        https://item.taobao.com/*
// @match        https://chaoshi.detail.tmall.com/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://www.iqiyi.com/v*
// @match        *://www.wasu.cn/Play/show/id/*
// @match        *://vip.kankan.com/vod/*
// @match        *://tv.sohu.com/v/*
// @match        *://vip.1905.com/play/*
// @match        *://film.sohu.com/album/*
// @match        *://tv.sohu.com/v/*
// @match        *://v.youku.com/v_show/*
// @match        *://www.mgtv.com/b/*
// @match        *://www.le.com/ptv/vplay/*
// @match        *://v.pptv.com/show/*
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
// @match        *://pan.baidu.com/disk/home*
// @match        *://yun.baidu.com/disk/home*
// @match        *://pan.baidu.com/s/*
// @match        *://yun.baidu.com/s/*
// @match        *://pan.baidu.com/share/link?*
// @match        *://yun.baidu.com/share/link?*
// @match        *://eyun.baidu.com/s/*
// @match        *://eyun.baidu.com/enterprise/*
// @require      https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/1.5.16/clipboard.min.js
// @resource     ID1 https://greasyfork.org/scripts/375972-m-coupon/code/M-Coupon.js?version=659951
// @resource     ID2 https://greasyfork.org/scripts/375976-m-vip/code/M-VIP.js?version=659956
// @resource     ID3 https://greasyfork.org/scripts/376385-m-baidu/code/M-baidu.js?version=662718
// @resource     ID4 https://greasyfork.org/scripts/376758-m-music/code/M-Music.js?version=662726
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @run-at       document-end
// ==/UserScript==
var host=location.host
if(host.indexOf("baidu.com")>0){
var tm3=GM_getResourceText("ID3");
eval(tm3);
}else{
var tm1=GM_getResourceText("ID2");
eval(tm1);
var tm2=GM_getResourceText("ID1")
eval(tm2);
var tm4=GM_getResourceText("ID4")
eval(tm4);
}