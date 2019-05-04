// ==UserScript==
// @name        百度搜啦自动跳转
// @description 百度搜啦，自动跳转
// @namespace   BDSola
// @include     http://www.bdsola.com/d/*
// @exclude     http://www.bdsola.com
// @match       http://www.3134.cc/d/*
// @require     http://cdn.staticfile.org/jquery/1.8.3/jquery.min.js
// @version     1.1
// @grant       none
// @run-at      document-end
// ==/UserScript==
    var bdLink = $("input[name='url']").attr("value"); //提取链接
    if (!bdLink.length) {
        return; //若获取磁力失败则终止脚本
    }
    window.location.href = bdLink;

