// ==UserScript==
// @name         优酷全屏快捷键（F键）
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Lu Xi
// @match        *v.youku.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var i=0
    document.onkeydown=function(e){
        var keyNum=window.event ? e.keyCode :e.which;
        if(keyNum==70 && i==0){
            document.getElementsByClassName("control-icon control-fullscreen-icon")[0].click()
            i=1
        }
        else if (keyNum==70 && i==1) {
            document.getElementsByClassName("control-icon control-halfscreen-icon")[0].click()
            i=0
        }
    }
    // Your code here...
})();