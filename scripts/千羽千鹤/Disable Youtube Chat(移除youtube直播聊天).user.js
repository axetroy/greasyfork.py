// ==UserScript==
// @name         Disable Youtube Chat(移除youtube直播聊天)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  移除youtube直播聊天
// @author       千羽千鹤
// @match        https://www.youtube.com/*
// @grant        none
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==
function change() {
$("ytd-live-chat-frame").css("display","none");
}
change();
var ref = "";
ref = setInterval(function(){
    change();
},1000);