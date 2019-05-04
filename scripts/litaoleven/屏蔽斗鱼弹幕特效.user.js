// ==UserScript==
// @name         屏蔽斗鱼弹幕特效
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动复制gitlab里的issue内容到剪切板,可直接粘贴到tower上使用.
// @author       LiTao
// @match        https://www.douyu.com/*
// @require        http://code.jquery.com/jquery-1.11.0.min.js
// @require        https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function(){
    	$("#__h5player img").css("opacity","0");
    },500);
})();