// ==UserScript==
// @name         高校邦关闭视频独占限制脚本
// @namespace    https://greasyfork.org/users/179410
// @version      0.1.5
// @description  关闭视频独占限制，11月17日可用
// @author       开源中国
// @match        *://*.class.gaoxiaobang.com/*
// @run-at       document-start
// @grant        none
// @namespace https://greasyfork.org/users/179410
// ==/UserScript==
'use strict';

(function(){
    var lock=false;
    function moocHacker(){
        // 解放视频
        var vid=document.getElementById("video_player_html5_api");
        if(vid!=undefined)vid.play();

    }
    window.setInterval(moocHacker,1000);
})();
