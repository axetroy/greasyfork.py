// ==UserScript==
// @name         油管自动点赞Auto-like
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto-like
// @author       You
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    var count=0;
    var si=setInterval(function(){
        var dz=document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-text")[0];
        var ydzs=document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-default-active");
        if(ydzs.length===0){
            dz.click();
            console.log("点赞成功"+(++count)+"次，恭喜你！");
        }
    },5000);

    // Your code here...
})();