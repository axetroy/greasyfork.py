// ==UserScript==
// @name         Base do IP alien
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  use os numeros, heuheu é nos, é o crime 
// @author       KING.K ;)
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();addEventListener("keydown", function(a) {
    if (a.keyCode == 97) { //Generators
              socket.emit("1",2.10,132,3);
              socket.emit("1",2.62,132,3);
              socket.emit("1",3.14,132,3);
              socket.emit("1",3.66,132,3);
              socket.emit("1",4.18,132,3);
              socket.emit("1",4.70,132,3);
              socket.emit("1",5.22,132,3);
              socket.emit("1",5.74,132,3);
              socket.emit("1",6.26,132,3);
              socket.emit("1",6.78,132,3);
              socket.emit("1",7.30,132,3);
              socket.emit("1",2.35,132,3);
              socket.emit("1",2.35,184,3);
              socket.emit("1",2.88,184,5);
              socket.emit("1",3.41,183,3);
              socket.emit("1",3.93,183,5);
              socket.emit("1",4.45,183,3);
              socket.emit("1",4.97,183,5);
              socket.emit("1",5.47,184,3);
              socket.emit("1",5.98,184,5);
              socket.emit("1",6.51,184,3);
              socket.emit("1",7.03,184,5);
    }
    if (a.keyCode == 99) { //simple turret
              socket.emit("1",2.88,184,2);
              socket.emit("1",2.35,184,2);
              socket.emit("1",3.41,183,2);
              socket.emit("1",3.93,183,2);
              socket.emit("1",5.98,184,2);
              socket.emit("1",6.51,184,2);
              socket.emit("1",7.03,184,2);
              socket.emit("1",5.47,184,2);
              socket.emit("1",5.98,184,2);
              socket.emit("1",6.51,184,2);
              socket.emit("1",7.03,184,2);
              socket.emit("1",3.41,184,2);
              socket.emit("1",3.93,184,2);
              socket.emit("1",4.45,184,2);
              socket.emit("1",4.97,184,2);
              socket.emit("1",2.35,184,2);
              socket.emit("1",2.35,184,2);
       }
    if (a.keyCode == 101) { //Armory
         socket.emit("1",UTILS.roundToTwo(1.56),UTILS.roundToTwo(132),7);
    }
    if (a.keyCode == 98) { //Houses
            socket.emit("1",2.54,245,4);
            socket.emit("1",2.82,245,4);
            socket.emit("1",3.09,245,4);
            socket.emit("1",3.36,245,1);
            socket.emit("1",3.62,245,4);
            socket.emit("1",3.90,245,4);
            socket.emit("1",4.17,245,4);
            socket.emit("1",4.44,245,4);
            socket.emit("1",5.02,245,4);
            socket.emit("1",5.29,245,4);
            socket.emit("1",5.56,245,4);
            socket.emit("1",5.82,245,4);
            socket.emit("1",6.08,245,1);
            socket.emit("1",6.35,245,4);
            socket.emit("1",6.62,245,4);
            socket.emit("1",6.90,245,4);
            socket.emit("1",7.44,245,4);
            socket.emit("1",7.72,245,4);
            socket.emit("1",8.00,245,4);
            socket.emit("1",8.28,245,4);
            socket.emit("1",1.89,186,4);
            socket.emit("1",2.35,184,4);
            socket.emit("1",2.88,184,4);
            socket.emit("1",3.41,184,4);
            socket.emit("1",3.93,184,4);
            socket.emit("1",4.45,184,4);
            socket.emit("1",4.97,184,4);
            socket.emit("1",5.47,184,4);
            socket.emit("1",5.98,184,4);
            socket.emit("1",6.51,184,2);
            socket.emit("1",7.03,184,2);
            socket.emit("1",7.50,186,2);
            socket.emit("1",4.72,245,1);
            socket.emit("1",2.26,245,4);
            socket.emit("1",7.19,245,4);
             }
    if (a.keyCode == 102) {//Walls
         for(i=-3.14;i<3.14;i+=0.075){
             socket.emit("1",i,1e3,1);
        }
    }
});