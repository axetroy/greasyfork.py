// ==UserScript==
// @name         斗鱼无弹幕
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  自动屏蔽所有斗鱼直播间弹幕
// @author       arryboom
// @match        *://www.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var time = 0;
    /*document.querySelector==$*/
setTimeout(function(){document.querySelector("div[class^='showdanmu-']").click();console.log("###Douyu###");},5000);
setTimeout(function(){
tstatus=document.querySelector("span[class^='shie-input']").attr("data-shield-status");
if (tstatus=="0"){
$("span[class^='shie-input']").children(".shie-checkbox-icon").click();
};},5000);
/*$('.PlayerCaseSub-Main').hide();隐藏聊天区*/
})();
