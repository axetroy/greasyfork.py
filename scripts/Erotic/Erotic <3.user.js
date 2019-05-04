// ==UserScript==
// @name         Erotic <3
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Los Amo By Erotic
// @author       Kai
// @match        http://dual-agar.online/*
// @match        http://dual-agar.me/dualplus/*
// @match        http://agar.io/*
// @match        http://gaver.io/*
// @match        http://duex.io/*
// @match        http://gota.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 0 ; //in ms

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

//© 2017. Erotic