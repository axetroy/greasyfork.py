// ==UserScript==
// @name         Anti kick By [IT]Itália
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  ANTI KICK PORRA.
// @author       
// @match        
// @grant        none
// ==/UserScript==

setInterval(updatePlayer,90000);
function updatePlayer(){
    socket.emit("2",0,0);
    socket.emit("2",Math.round(camX),Math.round(camY));
}// ==UserScript==
// @name         ThNa C.F Build
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  1 = 1st generators layer, 4 = 2nd generators layer, 2 = Simple turrets, 5 = Upgrade rangeds, 8 = Upgrade spotters, 3 = Walls, 6 = Upgrade boulders, 9 = Upgrade spikes, C = Move to commander.
// @author       HACK FC
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

addEventListener("keydown", function(a) {//Set Pos to Ally
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
                socket.emit("5",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 105){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("5",units[i].id,0);
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
});// ==UserScript==
// @name         ZOOM HACK for Bloble.io! 
// @namespace    none
// @version      1.0 FULL RELEASE
// @description  KEYS: F=(Z. OUT) C=(Z. IN) MOUSE SCROLLING(Z. IN/OUT)!
// @author       MaximusSRB (credit goes to HighNoon643)
// @match        http://bloble.io/*
// @match        http://www.bloble.io/*
// @grant        none
// ==/UserScript==

var scroll = 0;
 
mainCanvas.addEventListener ? (window.addEventListener("mousewheel", zoom, !1),
mainCanvas.addEventListener("DOMMouseScroll", zoom, !1)) : window.attachEvent("onmousewheel", zoom);
 
function zoom(a) {
    a = window.event || a;
    a.preventDefault();
    a.stopPropagation();
    scroll = Math.max(-1, Math.min(1, a.wheelDelta || -a.detail))
    if (scroll == -1) { //zoom out
        if (maxScreenHeight < 10000) {
            (maxScreenHeight += 250, maxScreenWidth += 250, resize());
            scroll = 0
        }
    }
 
    if (scroll == 1) { //zoom in
        if (maxScreenHeight > 1000) {
            (maxScreenHeight -= 250, maxScreenWidth -= 250, resize())
            scroll = 0
        }
    }
}
 
mainCanvas.onkeydown = function(event) {
    var k = event.keyCode ? event.keyCode : event.which;
    if (k == 70) { // F to zoom out
        if (maxScreenHeight < 10000) {
            (maxScreenHeight += 250, maxScreenWidth += 250, resize());
        }
    }
    if (k == 67) {// C to zoom in
        if (maxScreenHeight > 1000) {
            (maxScreenHeight -= 250, maxScreenWidth -= 250, resize())
        }
 
    }

    {if(65==a||37==a)cameraKeys.l=0,updateCameraInput();if(68==a||39==a)cameraKeys.r=0,updateCameraInput();if(87==a||38==a)cameraKeys.u=0,updateCameraInput();if(83==a||40==a)cameraKeys.d=0,updateCameraInput();if(32==a){var d=unitList.indexOf(activeUnit);sendUnit(d)}void 0!=upgrInputsToIndex["k"+a]&&toggleActiveUnit(upgrInputsToIndex["k"+a]);46==a&&selUnits.length&&sellSelUnits();84==a&&toggleChat("none"==chatListWrapper.style.display);
27==a&&(toggleActiveUnit(),disableSelUnit(),showSelector=!1);82==a&&(camY=camX=0)}};mainCanvas.onkeydown=function(a){a=a.keyCode?a.keyCode:a.which;socket&&player&&!player.dead&&(65!=a&&37!=a||cameraKeys.l||(cameraKeys.l=-1,cameraKeys.r=0,updateCameraInput()),68!=a&&39!=a||cameraKeys.r||(cameraKeys.r=1,cameraKeys.l=0,updateCameraInput()),87!=a&&38!=a||cameraKeys.u||(cameraKeys.u=-1,cameraKeys.d=0,updateCameraInput()),83!=a&&40!=a||cameraKeys.d||(cameraKeys.d=1,cameraKeys.u=0,updateCameraInput()))}
 


