// ==UserScript==
// @name         百度网盘直链下载迅雷加速版+VIP视频在线解析破解去广告+【一键领取】淘宝天猫隐藏优惠券，购物立省80%-2019.1.24加强稳定版
// @namespace    http://zfh.55xu.com/
// @version      1.1.276
// @description  百度网盘直链下载迅雷加速版！在视频标题旁上显示“vip解析(去广告)”按钮，在线播放vip视频；支持优酷vip，腾讯vip，爱奇艺vip，芒果vip，乐视vip等常用视频...通过淘宝客返利网站，查询商家设置的隐藏优惠券信息！直接领取优惠券购买
// @author       省钱购，gxvv,goudidiao，acao
// @match        https://s.taobao.com/*
// @match        https://list.tmall.com/*
// @match        https://list.tmall.hk/*
// @match        https://detail.tmall.hk/*
// @match        https://detail.tmall.com/*
// @match        https://item.taobao.com/*
// @match        https://chaoshi.detail.tmall.com/*
// @match        *://www.wasu.cn/Play/show/id/*
// @match        *://vip.kankan.com/vod/*
// @match        *://tv.sohu.com/v/*
// @match        *://vip.1905.com/play/*
// @match        *://tv.sohu.com/v/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://v.youku.com/v_show/*
// @match        *://www.mgtv.com/b/*
// @match        *://www.le.com/ptv/vplay/*
// @match        *://v.pptv.com/show/*
// @include      *://www.iqiyi.com/*
// @include      *://video.tudou.com/v/*
// @match        *://pan.baidu.com/disk/home*
// @match        *://yun.baidu.com/disk/home*
// @match        *://pan.baidu.com/s/*
// @match        *://yun.baidu.com/s/*
// @match        *://pan.baidu.com/share/link?*
// @match        *://yun.baidu.com/share/link?*
// @match        *://eyun.baidu.com/s/*
// @match        *://eyun.baidu.com/enterprise/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/1.5.16/clipboard.min.js
// @resource     ID1 https://greasyfork.org/scripts/376045-%E7%9C%81%E9%92%B1%E8%B4%AD%E4%BC%98%E6%83%A0%E5%88%B8/code/%E7%9C%81%E9%92%B1%E8%B4%AD%E4%BC%98%E6%83%A0%E5%88%B8%EF%BC%81!.js?version=660107
// @resource     ID2 https://greasyfork.org/scripts/375285-%E8%A7%86%E9%A2%91%E7%BD%91%E7%AB%99vip%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E5%8E%BB%E5%B9%BF%E5%91%8A/code/%E8%A7%86%E9%A2%91%E7%BD%91%E7%AB%99VIP%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E5%8E%BB%E5%B9%BF%E5%91%8A.js?version=652659
// @resource     ID3 https://greasyfork.org/scripts/375287-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E4%BF%AE%E6%94%B9%E7%89%88/code/%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E4%BF%AE%E6%94%B9%E7%89%88.js?version=651684
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @run-at       document-end
// @icon         https://5944022.s21i.faiusr.com/5/ABUIABAFGAAgvtTL3wUonO3zowcwMDgw.ico
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
}