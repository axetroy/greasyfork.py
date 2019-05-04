// ==UserScript==
// @name         去头条视频广告
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        http://video.eastday.com/a/*.html*
// @grant       unsafeWindow
// @grant       GM_setClipboard
// @run-at document-body
// ==/UserScript==
mp4long=0;//去掉广告
$(document).ready(function(){ 
    video0();
    //缩短加载时间,;默认3秒;
    setTimeout(function() {
        video0= function() {
           console.log('覆盖原函数');
        };
    },500);
});
