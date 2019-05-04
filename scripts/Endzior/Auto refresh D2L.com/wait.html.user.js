// ==UserScript==
// @name        Auto refresh D2L.com/wait.html
// @namespace   autoRefreshD2L
// @description Automatically refresh wait.html on d2l
// @include     http://dota2lounge.com/wait.html
// @version     final
// @grant       none
// @author      Endzior
// ==/UserScript==

function changePage()
{
  window.location = "http://dota2lounge.com";
  window.location = "http://dota2lounge.com/mybets"
  //window.location = "http://dota2lounge.com/myprofile";
}

numberOfMSToWait = 0;
setTimeout(changePage(), numberOfMSToWait);