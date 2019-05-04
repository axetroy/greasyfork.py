// ==UserScript==
// @name 惠惠购物助手（精简版）
// @description 有道购物助手，购物比价，自动对比电商同款商品价格，轻松网购不吃亏，更有各种优惠信息对比。
// @update 2018.11.06
// @version 0.5
// @author markreton
// @grant  轮回眼的鸣人
// @namespace https://greasyfork.org/
// @icon    https://www.huihui.cn/favicon.ico
// @include     http://*.jd.com/*
// @include     http://*.taobao.com/*
// @include     http://*.tmall.com/*
// @include     https://*.jd.com/*
// @include     https://*.taobao.com/*
// @include     https://*.tmall.com/*
// ==/UserScript==

(function(){
    var s = document.createElement('script');
    s.setAttribute('src','https://shared-https.ydstatic.com/gouwuex/ext/script/extension_3_1.js?vendor=youdao&browser=firefox');
    s.setAttribute('charset','utf-8');
    document.body.appendChild(s);
})();

window.addEventListener('beforescriptexecute',function(e){
  var src = e.target.src;
  if(src.indexOf('g.alicdn.com/alilog/mlog/aplus_v2.js'||'g.alicdn.com/secdev/adblk/index.js') !== -1){
    e.preventDefault();
  }
},false);