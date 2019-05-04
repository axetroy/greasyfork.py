// ==UserScript==
// @name        Hide leaderboards
// @namespace   https://greasyfork.org/ru/users/2205-ryzhehvost
// @description make leaderboards table hidable
// @include     http://playblink.com/
// @include     http://*.playblink.com/
// @version     1.1
// @grant       none
// ==/UserScript==
var elems = document.getElementsByTagName('font'), i;
for (i in elems) {
     if(elems[i].innerHTML=='LEADERBOARDS') {
       break;            
     }
 }
elems[i].addEventListener("click", function(){
           if (window.getComputedStyle(document.getElementsByClassName("leaderboard")[0]).getPropertyValue('display')=="none")
                 document.getElementsByClassName("leaderboard")[0].style.display = "table";
           else 
                 document.getElementsByClassName("leaderboard")[0].style.display = "none";
});
document.getElementsByClassName("leaderboard")[0].style.display = "none";