// ==UserScript==
// @name         Bloble.io Commander Factory Build
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  1 = 1st generators layer, 4 = 2nd generators layer, 2 = Simple turrets, 5 = Upgrade rangeds, 8 = Upgrade spotters, 3 = Walls, 6 = Upgrade boulders, 9 = Upgrade spikes, C = Move to commander.
// @author       You
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

addEventListener("keydown", function(a) {
    if (a.keyCode == 97){
        for(i=-3.14;i<=3.14;i+=0.5233){
            socket.emit("1",i,132,3);
        }
    }
    if (a.keyCode == 100){
        for(i=-2.965;i<=3.14;i+=0.3488){
            socket.emit("1",i,243.85,3);
        }
    }
    if (a.keyCode == 103){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 98){
        for(i=-3.14;i<=3.14;i+=0.3488){
            socket.emit("1",i,194,2);
        }
    }
    if (a.keyCode == 101){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&1==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,1);
             }
        }
    }
    if (a.keyCode == 104){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&3==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 99){
        for(i=-3.14;i<3.14;i+=0.216){
            socket.emit("1",i,1e3,1);
        }
    }
    if (a.keyCode == 102){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 105){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 67){
        for(i=0;i<units.length;++i){
            if(1==units[i].type&&"star"==units[i].shape&&units[i].owner==player.sid){
                camX = units[i].x-player.x;
                camY = units[i].y-player.y;
            }
        }
    }
});
