// ==UserScript==
// @name         永久更新免费领取百度网盘超级账号百度云直接下载助手直链加速支持迅雷+​VIP视频在线解析破解去广告+一站式音乐下载+一键领取淘宝、京东、拼多多大额优惠券、购物立省80%！2019.4.26加强版
// @namespace    http://zfh.55xu.com/
// @version      10.39
// @description  永久更新免费领取百度网盘SVIP账号修复百度云链接不能下载问题！百度云百度网盘获取直接下载链接+压缩下载链接；大文件/单文件/多文件/文件夹，支持点击直接下载免强制调用百度网盘客户端；通过淘宝客网站，查询商家设置的隐藏优惠券信息！直接领取优惠券购买。新增淘宝自动查券功能，给你购物带来全新体验。在视频标题旁上显示“点击VIP解析播放”按钮，在线播放vip视频；支持优酷vip，腾讯vip，爱奇艺vip，芒果vip，乐视vip等常用视频！一站式音乐搜索解决方案，网易云音乐，QQ音乐，酷狗音乐，酷我音乐，虾米音乐，新增一个全新的购物网站，备案号：浙ICP备17026363号，给您安全放心的购物环境！！！
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
// @match        *://www.kuwo.cn/*
// @match        *://www.kugou.com/*
// @match        *://music.taihe.com/*
// @match        *://www.1ting.com/*
// @match        *://www.app-echo.com/*
// @match        *://y.qq.com/*
// @match        *://www.djkk.com/*
// @match        *://www.yue365.com/*
// @match        *://music.163.com/*
// @match        *://lebo.taihe.com/*
// @match        *://yinmusic.taihe.com/*
// @match        *://www.9ku.com/*
// @match        *://www.9sky.com/*
// @match        *://www.yue365.com/*
// @match        *://www.xiami.com/*
// @match        *://www.vvvdj.com/*
// @match        *://www.5ydj.com/*
// @match        *://www.dj97.com/*
// @match        *://www.dj520.com/*
// @match        *://www.ik123.com/*
// @match        *://www.djhaiba.com/*
// @match        *://www.djye.com/*
// @match        *://www.y2002.com/*
// @match        *://www.yinyuetai.com/*
// @match        *://music.youku.com/*
// @match        *://music.tudou.com/*
// @match        *://music.iqiyi.com/*
// @match        *://v.qq.com/music/*
// @match        *://music.le.com/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/1.5.16/clipboard.min.js
// @resource     ID1 https://greasyfork.org/scripts/376045-%E7%9C%81%E9%92%B1%E8%B4%AD%E4%BC%98%E6%83%A0%E5%88%B8/code/%E7%9C%81%E9%92%B1%E8%B4%AD%E4%BC%98%E6%83%A0%E5%88%B8%EF%BC%81!.js?version=660107
// @resource     ID2 https://greasyfork.org/scripts/375285-%E8%A7%86%E9%A2%91%E7%BD%91%E7%AB%99vip%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E5%8E%BB%E5%B9%BF%E5%91%8A/code/%E8%A7%86%E9%A2%91%E7%BD%91%E7%AB%99VIP%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E5%8E%BB%E5%B9%BF%E5%91%8A.js?version=652659
// @resource     ID3 https://greasyfork.org/scripts/375287-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E4%BF%AE%E6%94%B9%E7%89%88/code/%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E4%BF%AE%E6%94%B9%E7%89%88.js?version=651684
// @resource     css http://lingquyouhuiquan.cn/yinyue.css
// @resource     ID4 https://greasyfork.org/scripts/379415-%E4%B8%8B%E9%9F%B3%E4%B9%90/code/%E4%B8%8B%E9%9F%B3%E4%B9%90.js?version=691049
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at       document-end
// @icon         https://5944022.s21i.faiusr.com/5/ABUIABAFGAAgvtTL3wUonO3zowcwMDgw.ico
// ==/UserScript==
var host=location.host;
/alert(host)/
if(host.indexOf("baidu.com")>0){
var tm3=GM_getResourceText("ID3");
eval(tm3);
}else{
var tm1=GM_getResourceText("ID2");
eval(tm1);
}
if(host.indexOf("taobao")>0|| host.indexOf("tmall")>-0 ){
var tm2=GM_getResourceText("ID1")
eval(tm2);
}
if(host.indexOf("kuwo")>-1 || host.indexOf("djkk")>-1 || host.indexOf("music.taihe.com")>-1 || host.indexOf("app-echo.com")>-1 || host.indexOf("kugou")>-1 ||host.indexOf("y.qq.com")>-1||host.indexOf("music.iqiyi.com")>-1 ||host.indexOf("music.tudou.com")>-1||host.indexOf("music.youku.com")>-1||host.indexOf("yinyuetai")>-1||host.indexOf("y2002")>-1||host.indexOf("djye")>-1||host.indexOf("djhaiba")>-1||host.indexOf("ik123")>-1||host.indexOf("dj520")>-1||host.indexOf("dj97")>-1||host.indexOf("5ydj")>-1||host.indexOf("vvvdj")>-1||host.indexOf("xiami")>-1||host.indexOf("yue365")>-1||host.indexOf("1ting")>-1){
var cirle=GM_getResourceText("ID4")
eval(cirle)
}
