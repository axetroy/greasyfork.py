// ==UserScript==
// @name         KING>Bases
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  aperte P para simple turret e sniper turret, aperte Ç para wall e L para generator, use o meu outro hack para upgrade
// @author       KING.K
// @match        https://bloble.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();addEventListener("keydown", function(a) {
    if (a.keyCode == 80) { //Generators
              socket.emit("1",2.10,132,2);
              socket.emit("1",2.62,132,2);
              socket.emit("1",3.14,132,2);
              socket.emit("1",3.66,132,2);
              socket.emit("1",4.18,132,2);
              socket.emit("1",4.70,132,5);
              socket.emit("1",5.22,132,2);
              socket.emit("1",5.74,132,2);
              socket.emit("1",6.26,132,2);
              socket.emit("1",6.78,132,2);
              socket.emit("1",7.30,132,2);
              socket.emit("1",2.35,132,2);
              socket.emit("1",1.89,186,5);
              socket.emit("1",2.35,184,5);
              socket.emit("1",2.88,184,5);
              socket.emit("1",3.41,184,5);
              socket.emit("1",3.93,184,5);
              socket.emit("1",4.45,184,5);
              socket.emit("1",4.97,184,5);
              socket.emit("1",5.47,184,5);
              socket.emit("1",5.98,184,5);
              socket.emit("1",6.51,184,5);
              socket.emit("1",7.03,184,5);
              socket.emit("1",7.50,186,5);
       }
    if (a.keyCode == 186) {//Walls
         for(i=-3.14;i<3.14;i+=0.075){
             socket.emit("1",i,1e3,1);
         }
    }
    if (a.keyCode == 80) { //Armory
         socket.emit("1",UTILS.roundToTwo(1.56),UTILS.roundToTwo(132),5);
    }
    if (a.keyCode == 76) { //Houses
            socket.emit("1",2.54,245,3);
            socket.emit("1",2.82,245,3);
            socket.emit("1",3.09,245,3);
            socket.emit("1",3.36,245,3);
            socket.emit("1",3.62,245,3);
            socket.emit("1",3.90,245,3);
            socket.emit("1",4.17,245,3);
            socket.emit("1",4.44,245,3);
            socket.emit("1",5.02,245,3);
            socket.emit("1",5.29,245,3);
            socket.emit("1",5.56,245,3);
            socket.emit("1",5.82,245,3);
            socket.emit("1",6.08,245,3);
            socket.emit("1",6.35,245,3);
            socket.emit("1",6.62,245,3);
            socket.emit("1",6.90,245,3);
            socket.emit("1",7.44,245,3);
            socket.emit("1",7.72,245,3);
            socket.emit("1",8.00,245,3);
            socket.emit("1",8.28,245,3);
            socket.emit("1",7.44,245,3);
            socket.emit("1",7.72,245,3);
            socket.emit("1",8.00,245,3);
            socket.emit("1",8.28,245,3);
            socket.emit("1",4.72,245,3);
            socket.emit("1",2.26,245,3);
            socket.emit("1",7.19,245,3);
         }
});