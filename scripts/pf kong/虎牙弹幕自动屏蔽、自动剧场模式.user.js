// ==UserScript==
// @name         虎牙弹幕自动屏蔽、自动剧场模式
// @namespace    http://tampermonkey.net
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*.huya.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //把弹幕全部隐藏
    var node=document.getElementById('watchChat_pub')
    node.hidden=true;

    var interval = setInterval(function(){
    var danmu=document.getElementById('player-danmu-btn');
    if(danmu){
        danmu.click();
        clearInterval(interval);
        }
    }, 1000);

     var interval2 = setInterval(function(){
    var fullpage=document.getElementById('player-fullpage-btn');
    if(fullpage){
        fullpage.click();
        clearInterval(interval2);
        }
    }, 1000);

})();