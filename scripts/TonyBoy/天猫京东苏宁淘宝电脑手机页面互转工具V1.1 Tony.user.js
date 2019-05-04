// ==UserScript==
// @name         天猫京东苏宁淘宝电脑手机页面互转工具V1.1 Tony
// @namespace    https://www.abmbio.xin/
// @version      1.1
// @description  苏宁秒杀助手,秒杀产品购买助手
// @author       Tony Liu
// @include      http*://product.suning.com/*
// @include      http*://m.suning.com/product/*
// @include      http*://item.taobao.com/*
// @include      http*://h5.m.taobao.com/*
// @include      http*://detail.m.tmall.com/*
// @include      http*://detail.tmall.com/*
// @include      http*://item.jd.com/*
// @include      http*://item.m.jd.com/*
// @grant        none
// @icon         https://www.abmbio.xin/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    var tony='https://www.abmbio.xin';
    var tonyhost=window.location.host;
    var tonypath=window.location.pathname;
    var reg;
    var r;
    var elemDiv = document.createElement('div');
    var first=document.body.firstChild;
    elemDiv.style.cssText = 'position:fixed;display:block;z-index:999999;left:0;top:50%;';
    elemDiv.innerHTML = '<img src="https://www.abmbio.xin/default/images/Tool/tonypcwapexchange.jpg" alt="点我一键转换电脑/手机页面" style="cursor:pointer" id="letTonyChange"/><p style="background:#b4edfe;text-align:center;"><a href="https://www.abmbio.xin" target="_blank">关于作者</a>|<a href="http://bbs.abmbio.xin" target="_blank">更多优惠</a></p>';
    document.body.insertBefore(elemDiv,first);
    if(tonyhost == "m.suning.com"){tony="https://product.suning.com"+tonypath.replace('/product','');}
    else if(tonyhost == "product.suning.com"){tony="https://m.suning.com/product"+tonypath;}
    else if(tonyhost == "h5.m.taobao.com"){reg = new RegExp("(^|&)id=([^&]*)(&|$)", "i");r = window.location.search.substr(1).match(reg);if (r != null){tony="https://item.taobao.com/item.htm?id="+unescape(r[2]);}else{tony='https://www.abmbio.xin';}}
    else if(tonyhost == "detail.m.tmall.com"){reg = new RegExp("(^|&)id=([^&]*)(&|$)", "i");r = window.location.search.substr(1).match(reg);if (r != null){tony="https://detail.tmall.com/item.htm?id="+unescape(r[2]);}else{tony='https://www.abmbio.xin';}}
    else if(tonyhost=="item.taobao.com"){reg = new RegExp("(^|&)id=([^&]*)(&|$)", "i");r = window.location.search.substr(1).match(reg);if (r != null){tony="https://h5.m.taobao.com/awp/core/detail.htm?id="+unescape(r[2]);}else{tony='https://www.abmbio.xin';}}
    else if(tonyhost=="detail.tmall.com"){reg = new RegExp("(^|&)id=([^&]*)(&|$)", "i");r = window.location.search.substr(1).match(reg);if (r != null){tony="https://detail.m.tmall.com/item.htm?id="+unescape(r[2]);}else{tony='https://www.abmbio.xin';}}
    else if(tonyhost=="item.jd.com"){tony="https://item.m.jd.com/product"+tonypath+'?cu=true&utm_source=media.jd.com&utm_medium=tuiguang&utm_campaign=t_2008911829_&utm_term=af07bf9e89304c3c987eea6975acc003';}
    else if(tonyhost=="item.m.jd.com"){tony="https://item.jd.com"+tonypath.replace('/product','')+'?cu=true&utm_source=media.jd.com&utm_medium=tuiguang&utm_campaign=t_2008911829_&utm_term=af07bf9e89304c3c987eea6975acc003';}
    document.getElementById("letTonyChange").onclick=function(){location.href=tony;};
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7f9964d6e2815216bcb376aa3325f971";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
})();