// ==UserScript==
// @name         Fast Macros And Respawn With "m"
// @namespace    Fast Macros And Respawn With "m"
// @version      1.7
// @description  Fastest Mass Ejector & Split Macro
// @author       Hiruna :)
// @match        *.astr.io*
// @match        *.popsplit.us/*
// @match        *.gaver.io/*
// @match        *.gota.io/*
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
    if (event.keyCode == 65) { //key A
        split();
        setTimeout(split, speed);
    }
        if (event.keyCode == 81) { //key R
            closeStats();
            rspwn(document.getElementById('nick').value);
    }
    if (event.keyCode == 68) { //key D
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
        setTimeout(eject, speed);
    }
}

function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key space
    $("body").trigger($.Event("keyup", { keyCode: 32})); //Why You Look Here O_o
}
