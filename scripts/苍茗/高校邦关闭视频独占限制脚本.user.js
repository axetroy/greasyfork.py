// ==UserScript==
// @name         高校邦关闭视频独占限制脚本
// @version      0.1.1
// @description  （别的学校的高校邦也能使用了）关闭视频独占限制，原版本失效所以我更新了一下，感谢原作者，2019-3-6可用
// @author       苍茗
// @match         *://*.class.gaoxiaobang.com/*
// @run-at       document-start
// @grant        none
// @namespace https://greasyfork.org/users/220509
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
