// ==UserScript==
// @name         moomoo greathammer build
// @namespace    http://tampermonkey.net/
// @version      1.02
// @description  Swaps to food when right clicked, 'shift' switches to Great Hammer
// @author       meatman2tasty
// @match        http://moomoo.io/*
// @grant        none
// ==/UserScript==

$("#gameCanvas").mousedown(function(ev){
      if(ev.which == 3)
      {
        document.getElementById("actionBarIcon5").click();
      }
});

document.addEventListener("keydown", function(a) {
    if (a.keyCode == 16) {
 document.getElementById("actionBarIcon4").click();
    }
}, false);

document.addEventListener("keydown", function(a) {
    if (a.keyCode == 81) {
 document.getElementById("actionBarIcon4").click();
    }
}, false);

window.oncontextmenu = function () {
   return false;
};