// ==UserScript==
// @name         omega5
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  virus
// @author       stamer :)
// @match        http://bloble.io/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();addEventListener("keydown", function(a) {
    if (a.keyCode == 97) {//Walls
         for(i=-3.14;i<3.14;i+=0.075){
             socket.emit("1",i,1e3,1);
        }
    }
});