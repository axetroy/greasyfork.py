// ==UserScript==
// @name         ULTRA FAST W GAVER.IO!
// @namespace    Gaver.io Fast E
// @version      2.0
// @description  Macro E Gaver.io by Numb
// @author       Numb
// @match        http://gaver.io/*
// @match        http://alis.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 20000; //in ms

function keydown(event) {
    if (event.keyCode == 200000 && EjectDown === false) { // key A
        EjectDown = true;
        setTimeout(eject, speed);
    }
}
function keyup(event) {
    if (event.keyCode == 200000) { // key A
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 10000000000}); // key E
        window.onkeyup({keyCode: 10000000000});
        setTimeout(eject, speed);
    }
}