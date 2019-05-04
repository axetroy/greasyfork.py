// ==UserScript==
// @name         AgarX/Ogar Macro by VeganBabe
// @namespace    http://tampermonkey.net/
// @version      2.019
// @description  Fast Feed & Split
// @author       VeganBabe
// @match        http://agarx.biz/*
// @match        http://ogar.be/*
// @grant        none
// @run-at       document-end
// ==/UserScript==



window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 50; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 27) { //key ESC
        split();
        setTimeout(split, speed);
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