// ==UserScript==
// @name         哔哩哔哩(bilibili.com)番剧跳过片头
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  片头开始播放时，按 J 键跳过片头
// @author       zhpjy
// @match        *://www.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @license     WTFPL
// ==/UserScript==

var keyCode = 74; // 键码
var OPTime = 90; //片头长度
var RecTime = 1; //反应时间

var allowed = true;
$(document).keydown(function(event) {
	if (event.repeat != undefined) {
		allowed = !event.repeat;
	}
	if (!allowed)
		return;
	allowed = false;
    if(event.keyCode == keyCode){
        var video = $('.bilibili-player-video video')[0];
        if(video.currentTime>0){
            video.currentTime += (OPTime-RecTime);
        }else{
            video.currentTime += OPTime;
            video.play();
        }
    }
});

$(document).keyup(function(e) { allowed = true; });
$(document).focus(function(e) { allowed = true; });