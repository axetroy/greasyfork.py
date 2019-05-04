// ==UserScript==
// @name         Stick Run Free Cost
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Stick Run Free Cost Akash
// @author       Akash
// @match        http://stickrun.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var free cost = true;

var speed = 9; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key A
        EjectDown = false;
        setTimeout(buying);
    }
}
function keyup(event) {
    if (event.keyCode == 87) { // key A
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 10000000}); // key W
        window.onkeyup({keyCode: 10000000});
        setTimeout(eject, speed);
    }
}