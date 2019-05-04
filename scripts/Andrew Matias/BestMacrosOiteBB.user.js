// ==UserScript==
// @name         BestMacrosOiteBB
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Fast macro made by Oitebebe
// @author       OiteBb
// @match        http://dual-agar.me/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 0.000000000000000000000000000000000000000000-1111111111.01;

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) {
        EjectDown = true;
        setTimeout(eject, speed);
    }
}
function keyup(event) {
    if (event.keyCode == 87) {
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
var welcome="wassup nigger,make sure to sub to my account tanti xd";
alert(welcome);
//Made by OiteBebe