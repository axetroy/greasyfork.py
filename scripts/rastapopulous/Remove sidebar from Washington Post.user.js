// ==UserScript==
// @name         Remove sidebar from Washington Post
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes adblock sidebar from WP
// @author       rastapopulous
// @include /^http(s?)://((www\.)?)washingtonpost\.com/(.+)?/\d\d\d\d/(.+)$/
// @grant        none
// ==/UserScript==

var myTimer = setInterval(
  function () {
    'use strict';
   
    var adblockerRoot = document.getElementsByClassName("adblocker-root");
    console.log(adblockerRoot[0]);
    if(adblockerRoot === null){
       return;
    }
    adblockerRoot[0].parentNode.removeChild(adblockerRoot[0]);
    console.log("Adblock sidebar removed"); 

    clearInterval(myTimer);
  }, 100);