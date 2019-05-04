// ==UserScript==
// @name         Bueluke's Macro
// @namespace    http://tampermonkey.net/
// @version      2.9.4
// @description  Macro W Gaver.io & Dual agar by Bueluke
// @author       Bueluke
// @match        http://gaver.io/
// @match        http://dual-agar.me/*
// @match        http://dual-agar.online/*
// @match        http://alis.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 1; //in ms

function keydown(event) {
    if (event.keyCode == 60 && EjectDown === false) { // key E
        EjectDown = true;
        setTimeout(eject, speed);
    }
}
function keyup(event) {
    if (event.keyCode == 87) { // key W
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode:  87}); // key W
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed*2);
       setTimeout(eject, speed*2);
   }
}

if (event.keyCode == 84) {
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
   }
}

 if (event.keyCode == 84) {
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
   }
}

 
    if (event.keyCode == 68) { //key D
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
}

     if (event.keyCode == 84) { //key T
        split();
        setTimeout(split, speed);

 }
    var EjectDown = false;

var speed = 1; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
}
function keyup(event) {
    if (event.keyCode == 87) { // key W
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87}); // key W
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }
}

//© 2017. thefix. All Rights Reserved