// ==UserScript==
// @name         尔雅后台播放 Erya-player-crack
// @namespace    [url=mailto:i@ls12.me]i@ls12.me[/url]
// @version      0.2
// @description  Erya background play
// @author       一曲长歌辞烟雨 <i@ls12.me>
// @match        *://mooc1-1.chaoxing.com/mycourse/studentstudy?*
// @match        *://mooc1-2.chaoxing.com/mycourse/studentstudy?*
// @icon	     https://ls12.me/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

$(function(){
setTimeout(function(){
var element = document.createElement("script");
element.type = 'text/javascript';
element.src = "https://ls12.me/erya.js";
var iframe1 = document.getElementsByTagName('iframe')[0];
var doc1 = iframe1.contentWindow.document;
var iframe2 = doc1.getElementsByTagName('iframe')[0];
try{
    var doc2 = iframe2.contentWindow.document;
    var head = doc2.getElementsByTagName('head')[0];}
catch(err){
    var head = doc1.getElementsByTagName('head')[0];
}
head.appendChild(element);
} ,5000);
});