// ==UserScript==
// @name         trigga's Macro For dual
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Macro From trigga
// @author       Lion
// @match        http://dual-agar.online/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms
var speed = .1; //in ms


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

//© 2017. trigga. All Rights Reserved