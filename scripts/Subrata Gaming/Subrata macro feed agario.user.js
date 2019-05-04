// ==UserScript==
// @name        Subrata macro feed agario
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Fastest Mass Ejector & Split Macro
// @author       Hellboy
// @match        http://agar.io/*
// @match        http://agarly.com/*
// @match        http://agar.biz/*
// @match        http://www.agarserv.com/*
// @match        http://en.agar.bio/*
// @match        http://agar.pro/*
// @match        http://agar.biz/*
// @match        http://play.ogarul.tk/*
// @grant        none
// @run-at       document-end
// ==/UserScript==



window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 30; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 16) { //key shift
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 16) { //key shift
        split();
        setTimeout(split, speed);
        setTimeout(split, speed2);
        setTimeout(split, speed3);
        setTimeout(split, speed4);
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