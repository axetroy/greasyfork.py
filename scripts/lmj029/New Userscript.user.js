// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1:8080/MicroStrategy/servlet/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var la = document.getElementById("Uid");
    
    if(la !== null) {
        la.value = "Administrator";
        document.getElementById("3054").click();
    }
    
    var lb = document.getElementById("dktpSectionCreate");
    if(lb !== null) {
           microstrategy.openDataImport();
    }

    
    
 
})();