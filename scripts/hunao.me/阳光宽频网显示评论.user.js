// ==UserScript==
// @name         阳光宽频网显示评论
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  阳光宽频网显示评论,作者关注,支持点赞
// @author       http://hunao.me
// @match        *.365yg.com/*
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';
    var temp_href = window.location.href;
   window.location.href=temp_href.replace("365yg","ixigua");
})();