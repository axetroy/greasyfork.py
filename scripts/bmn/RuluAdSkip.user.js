// ==UserScript==
// @name         RuluAdSkip
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Skips Ads and removes AdBlocker Warinings
// @author       bmn
// @match        https://www.rulu.co/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
 window.onload = function () {
     var elements = document.getElementsByTagName("a");
     var indx = 0;
     for (var ie = 0; ie < elements.length; ie++) {

         if (elements[ie].href.indexOf("https://rulu.io/j/") !== -1) {
             indx++;

             elements[ie].href = elements[ie].href.replace("https://rulu.io/j/", "");
             //alert(elements[ie].href);
         }
     }

 };


     var intv = setInterval(function(){
         var adb = document.getElementsByTagName("div");
         for (var ab = 0; ab < adb.length; ab++) {

             if (parseInt(window.getComputedStyle(adb[ab], null).getPropertyValue("z-index")) > 1000) {
                 adb[ab].parentElement.removeChild(adb[ab]);
             }
         }
         var pare = document.getElementById("d0bf").parentElement;
         var chil = pare.childElementCount;
         pare.removeChild(document.getElementById("d0bf"));
         if (pare.childElementCount < chil){clearInterval(intv);}
         }, 10);




})();