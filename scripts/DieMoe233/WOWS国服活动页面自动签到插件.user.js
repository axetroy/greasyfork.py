// ==UserScript==
// @name         WOWS国服活动页面自动签到插件
// @namespace     http://TouHou.DieMoe.net/
// @version      0.8
// @description  让二雷的活动签到变得更加轻松。
// @author       DieMoe
// @run-at       document-idle
// @match        *://wows.kongzhong.com/ztm/*
// @grant          unsafeWindow
// @compatible firefox
// @compatible chrome
// @compatible edge
// ==/UserScript==

(function() {
    'use strict';
    unsafeWindow.DPS_LoaderJS_v=0.8;
    var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src="http://code.taobao.org/svn/userjs-assets/trunk/wows-kongzhong/double-thunder-ztm.js";head.appendChild(script);
})();