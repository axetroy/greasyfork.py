// ==UserScript==
// @name         Gaver.io Nuevo MACRO E (200K en 10 segundos)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Nuevo macro presiona 10 segundos la tecla e
// @author       Madness
// @match        http://gaver.io/
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 65; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key e
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