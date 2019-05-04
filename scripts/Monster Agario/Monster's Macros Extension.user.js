// ==UserScript==
// @name         Monster's Macros Extension
// @namespace    Extension
// @version      1.0
// @description  1000 installs for v2? ( ͡° ͜ʖ ͡°)
// @author       MonsteR
// @match        http://agar.io/*
// @match        http://petridish.pw/*
// @match        http://agarly.com/*
// @match        http://agar.biz/*
// @match        http://en.agar.bio/*
// @match        http://agar.pro/*
// @match        http://agar.biz/*
// @grant        none
// ==/UserScript==

$("h2").replaceWith('<h2>Its Monster</h2>'); 

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 71) { //key G
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 84) { //key T
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
    if (event.keyCode == 80) { //key P
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