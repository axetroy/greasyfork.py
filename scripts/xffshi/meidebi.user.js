// ==UserScript==
// @name         meidebi
// @namespace    http://your.homepage/
// @version      0.4
// @description  enter something useful
// @author       You
// @match        http://www.meidebi.com/*
// @grant        none
// ==/UserScript==

setTimeout(function() {
    
   if (document.getElementById("checkinBtn").innerHTML == "签到领积分") {

    document.getElementById("checkinBtn").click();
    
    setTimeout(document.getElementById("checkin_btn").click(),3000);
    
   } 
 }, 3000);
