// ==UserScript==
// @name         Autoswap right click /shoot once /not toggle
// @namespace    http://tampermonkey.net/
// @version      1.07
// @description  right click to fire secondary once
// @author       meatman2tasty
// @match        http://karnage.io/*
// @grant        none
// ==/UserScript==

$("#gameHudContainer").mousedown(function(ev){
      if(ev.which == 3)
      {
          window.scrollBy(0, 9); // Scroll 100px to the right
      }
});

$("#gameHudContainer").mouseup(function(ev){
      if(ev.which == 3)
      {
          window.scrollBy(0, 9); // Scroll 100px to the right
      }
});