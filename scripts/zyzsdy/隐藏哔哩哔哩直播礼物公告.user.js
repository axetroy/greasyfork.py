// ==UserScript==
// @name            隐藏哔哩哔哩直播礼物公告
// @namespace       moe.kotori.bililivetools
// @version         0.0.1
// @description     隐藏哔哩哔哩直播的占用空间巨大的全服礼物公告。
// @author          Zyzsdy
// @match           http://live.bilibili.com/*
// @match           https://live.bilibili.com/*
// @run-at          document-start
// ==/UserScript==

(function(){
	var styleNode = document.createElement("style");
	styleNode.type = "text/css";
	var rule = document.createTextNode(".bilibili-live-player-video-gift{display:none;}");
	styleNode.appendChild(rule);
	document.getElementsByTagName("head")[0].appendChild(styleNode);
})();