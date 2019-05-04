// ==UserScript==
// @name         Night Shift Board
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  goes from Night Shift to Morning Shift
// @author       You
// @match        https://realtimeboard.com/app/board/o9J_k03FBaU=/
// @grant        none
// ==/UserScript==

var d= new Date();
var h= d.getHours();
var m= d.getMinutes();
if((m >=55) && (h == 5)){
window.open("https://realtimeboard.com/app/board/o9J_k00_OPA=/","_self")
}else if(m >= 50 && h == 5){
    setInterval(function(){ location.reload(); }, 60*1000)
}else(setInterval(function(){ location.reload(); }, 10*60*1000))