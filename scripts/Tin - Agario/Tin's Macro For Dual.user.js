// ==UserScript==
// @name         Tin's Macro For Dual 
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Macro From Tin
// @author       Lion
// @match        http://dual-agar.me/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = .0000000000000000000000000000000000000000000000001; //in ms

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

//© 2017. Lion. All Rights Reserved