// ==UserScript==
// @name         西瓜视频全屏（按F键）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       luxi
// @match        https://www.ixigua.com/*
// @run-at document-idle
// ==/UserScript==

(function() {
    'use strict';

document.onkeydown=function(e){
var keyNum=window.event ? e.keyCode :e.which;
if(keyNum==70){
try {
        document.getElementsByClassName("vjs-fullscreen-control vjs-control vjs-button ")[0].click()
}
    catch(eer) {
        document.getElementsByClassName("fullscreen")[0].click()
    }
    ;
}
}
    // Your code here...
})();