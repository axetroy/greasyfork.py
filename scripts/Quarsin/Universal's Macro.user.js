// ==UserScript==
// @name         Universal's Macro
// @namespace    http://tampermonkey.net/
// @version      v3.21
// @description  E is Fast Feed, L is Stop and T is 16-Split.
// @author       Quarsin
// @match        http://germs.io/
// @grant        none
// @run-at       document-end
// ==/UserScript==



window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 10; //in ms

function keydown(event) {
    if (event.keyCode == 69 && EjectDown === false) { // key E
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 76) { //key L
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
     if (event.keyCode == 84) { //key T
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
}

function keyup(event) {
    if (event.keyCode == 69) { // key Q
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87});
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }
}

function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key space
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
}