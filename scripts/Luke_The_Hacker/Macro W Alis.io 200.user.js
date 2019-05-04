// ==UserScript==
// @name         Macro W Alis.io 200
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Macro for Alis 200+
// @author       Luke
// @match        http://alis.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 1; //in ms

function keydown(event) {
    if (event.keyCode == 500 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
}
function keyup(event) {
    if (event.keyCode == 500) { // key W
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 500}); // key W
        window.onkeyup({keyCode: 500});
        setTimeout(eject, speed);
    }
}

//© 2017. Luke. All Rights Reserved