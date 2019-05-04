// ==UserScript==
// @name         测试酷我音乐下载mp3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.kuwo.cn/yinyue/*
// @match        *://bd.kuwo.cn/yinyue/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var videoSite = window.location.href;
    var reKW = /kuwo.cn\/yinyue/i;
	var musicId = $('.musiciPic').attr('data-musicId');
    var vipBtn = '<a target="_blank" id="VipMusicBtn" style="color:red;">一键免费下载</a>';
     if(reKW.test(videoSite)){
         $('#sinlesDownBtn').attr('href','http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=MUSIC_'+musicId+'&type=convert_url&response=res');

  }
})();