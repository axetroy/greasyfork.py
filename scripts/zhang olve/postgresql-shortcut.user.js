// ==UserScript==
// @name         postgresql-shortcut
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  try to take over the world!
// @author       You
// @match        https://www.postgresql.org/docs/10/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload=function(){
     document.addEventListener('keyup',function(e) {
      //往后翻页
         if(e.keyCode===39) {
           var a = document.querySelectorAll('[accesskey="n"]')[0];
             if(a) {
             window.location.href = a.getAttribute('href');
             }
         }
         if(e.keyCode===37) {
           var b = document.querySelectorAll('[accesskey="p"]')[0];
             if(b) {
              window.location.href = b.getAttribute('href');
             }
         }
     })
    }
    // Your code here...
})();