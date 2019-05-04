// ==UserScript==
// @name         best.pconline
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://best.pconline.com.cn/
// @grant        none
// ==/UserScript==
setTimeout(function() {
    
   if (document.getElementsByClassName("nb-sign-btn")[0].innerHTML == "签到领积分") {
       document.getElementsByClassName("nb-sign-btn")[0].click();
   } 
 }, 5000);