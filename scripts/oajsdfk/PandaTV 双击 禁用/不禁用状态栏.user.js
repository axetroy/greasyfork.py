// ==UserScript==
// @name         PandaTV 双击 禁用/不禁用状态栏
// @namespace    PandaTV 双击 禁用/不禁用状态栏
// @version      0.2.0
// @description  change panda.tv html5 player's double click behavier to forbidding/allowing status bar.
// @author       oajsdfk
// @include      http://www.panda.tv/*
// @exclude      http://www.panda.tv/cate/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
$(document).ready(function(){
	setTimeout(function(){
		console.log('双击 禁用/不禁用状态栏');
		var player = $('div.room-player-swf-box');

		//取消已注册的双击事件
		player.off('dblclick');
		player.find('*').off('dblclick');

		player.dblclick(function(){
			$('div.h5-control').toggle();// 禁用/不禁用状态栏
		});
	}, 1000);//延时1秒，等待播放器加载完成
});