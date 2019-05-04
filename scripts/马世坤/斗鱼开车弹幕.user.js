// ==UserScript==
// @name         斗鱼开车弹幕
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  （关注斗鱼229346）自定义斗鱼弹幕，体验全平台开车
// @author       You
// @match        *://*.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    //长度设置为100，可自行修改
    setInterval(function() {
        $('textarea').attr("maxlength","100");
    },200);
})();

function user_click(){
    document.getElementsByClassName("peck-cdn").click();
}
var i=1;
var t=setInterval(function(){
    //自定义弹幕内容
    var data = '刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀刀'
    if (i%2==0){
       document.getElementsByClassName('ChatSend-txt')[0].value = data ;
    }else{
       document.getElementsByClassName('ChatSend-txt')[0].value = data  + '!';
    }
        document.getElementsByClassName('ChatSend-button ')[0].click();
    i++;
}, Math.random()*200+800);

