// ==UserScript==
// @name         moomoo shortsword+bow build
// @namespace    http://tampermonkey.net/
// @version      1.02
// @description  Swaps to food when right clicked, 'shift' switches to shortsword, 'q' switches to bow
// @author       meatman2tasty
// @match        http://moomoo.io/*
// @grant        none
// ==/UserScript==

document.addEventListener("keydown", function(a) {
    if (a.keyCode == 16) {
 document.getElementById("actionBarIcon2").click();
    }
}, false);

document.addEventListener("keydown", function(a) {
    if (a.keyCode == 81) {
 document.getElementById("actionBarIcon3").click();
    }
}, false);

$("#gameCanvas").mousedown(function(ev){
      if(ev.which == 3)
      {
        document.getElementById("actionBarIcon6").click();
      }
});

window.oncontextmenu = function () {
   return false;
};