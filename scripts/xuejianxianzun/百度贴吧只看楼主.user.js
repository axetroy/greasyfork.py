// ==UserScript==
// @name         百度贴吧只看楼主
// @namespace    http://saber.love/?p=3427
// @version      1.0
// @description  在帖子的任何地方，按下Alt+L组合键即可自动点击“只看楼主”，不用再翻到帖子顶部去点击啦
// @author       雪见仙尊
// @include      http://tieba.baidu.com/p/*
// @include      https://tieba.baidu.com/p/*
// @grant        none
// ==/UserScript==
document.addEventListener("keydown", function(event) {
	var ev = event || window.event;
	if (ev.altKey&&ev.keyCode==76) {
		document.querySelector("#lzonly").click();
	}
}, false);