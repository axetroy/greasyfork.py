// ==UserScript==
// @name         Para todos v:
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Fastest Mass Ejector & Split Macro
// @author       Krytex
// @match        http://dual-agar.online/*
// @match        http://dual-agar.me/dualplus/*
// @match        http://agarly.com/*
// @match        http://agar.biz/*
// @match        http://en.agar.bio/*
// @match        http://dual-agar.me/dualplus//*
// @match        http://agar.io/*
// @grant        none
// @run-at       document-end
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
    if (event.keyCode ==  vbKeyd) { //key d
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
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
        setTimeout(eject, speed);
    }
}

function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key space
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
}