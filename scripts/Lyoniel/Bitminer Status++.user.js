// ==UserScript==
// @name         Bitminer Status++
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://bitminer.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
   setInterval(function(){
      var mined = window.frames[0].$("#stext").text();
       document.title = mined;
   }, 3000);
    // Your code here...
})();