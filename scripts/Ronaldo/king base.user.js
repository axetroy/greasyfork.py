// ==UserScript==
// @name         king base
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  aperte I para a base e O para upgrade
// @author       KM KING K
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==
addEventListener("keydown", function(a) {
    if (a.keyCode == 73) { //
              socket.emit("1",2.10,132,1);
              socket.emit("1",2.62,132,1);
              socket.emit("1",3.14,132,1);
              socket.emit("1",3.66,132,1);
              socket.emit("1",4.18,132,1);
              socket.emit("1",4.70,132,1);
              socket.emit("1",5.22,132,1);
              socket.emit("1",5.74,132,1);
              socket.emit("1",6.26,132,1);
              socket.emit("1",6.78,132,1);
              socket.emit("1",7.30,132,1);
              socket.emit("1",2.35,132,1);
       }
    if (a.keyCode == 73) { //
         socket.emit("1",UTILS.roundToTwo(1.56),UTILS.roundToTwo(132),1);
    }
    if (a.keyCode == 73) { //
            socket.emit("1",2.54,245,1);
            socket.emit("1",2.82,245,1);
            socket.emit("1",3.09,245,1);
            socket.emit("1",3.36,245,1);
            socket.emit("1",3.62,245,1);
            socket.emit("1",3.90,245,1);
            socket.emit("1",4.17,245,1);
            socket.emit("1",4.44,245,1);
            socket.emit("1",5.02,245,1);
            socket.emit("1",5.29,245,1);
            socket.emit("1",5.56,245,1);
            socket.emit("1",5.82,245,1);
            socket.emit("1",6.08,245,1);
            socket.emit("1",6.35,245,1);
            socket.emit("1",6.62,245,1);
            socket.emit("1",6.90,245,1);
            socket.emit("1",1.89,186,2);
            socket.emit("1",2.35,184,2);
            socket.emit("1",2.88,184,2);
            socket.emit("1",3.41,184,2);
            socket.emit("1",3.93,184,2);
            socket.emit("1",4.45,184,2);
            socket.emit("1",4.97,184,2);
            socket.emit("1",5.47,184,2);
            socket.emit("1",5.98,184,2);
            socket.emit("1",6.51,184,2);
            socket.emit("1",7.03,184,2);
            socket.emit("1",7.50,186,2);
            socket.emit("1",7.44,245,1);
            socket.emit("1",7.72,245,1);
            socket.emit("1",8.00,245,1);
            socket.emit("1",8.28,245,1);
            socket.emit("1",7.44,245,1);
            socket.emit("1",7.72,245,1);
            socket.emit("1",8.00,245,1);
            socket.emit("1",8.28,245,1);
            socket.emit("1",4.72,245,1);
            socket.emit("1",2.26,245,1);
            socket.emit("1",7.19,245,1);
         }
    if (a.keyCode == 79){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&1==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,1);
             }
        }
    }
    if (a.keyCode == 79){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&3==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 79){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 79){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
});