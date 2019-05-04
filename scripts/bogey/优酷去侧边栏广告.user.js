// ==UserScript==
// @name         优酷去侧边栏广告
// @namespace    Bogey
// @version      0.3
// @author       Bogey
// @description  优酷去侧边栏广告。
// @include      http://v.youku.com/*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
	$("#lotteryToolbar").remove();
        $("#lotteryToolbarBig").remove();
        $("div.listcontrol").remove();
})();