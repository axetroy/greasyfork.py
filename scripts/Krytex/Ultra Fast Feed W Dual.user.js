// ==UserScript==
// @name         Ultra Fast Feed W Dual
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Macro W dual-agar.online by zMsH
// @author       Kai
// @match        http://dual-agar.online/*
// @run-at       document-end
// @grant        none
// ==/UserScript==


window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 57) { //key d
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 68) { //key z
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
    if (event.keyCode == 83) { //key S
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
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