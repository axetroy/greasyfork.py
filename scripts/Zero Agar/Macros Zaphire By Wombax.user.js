// ==UserScript==
// @name         Macros Zaphire By Wombax
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Fastest Mass Ejector & Split Macro
// @author       BlackTower
// @match        http://zapphy.epizy.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
 
 
 
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
 
var EjectDown = false;
 
var speed = 25; //in ms
 
function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // Cebar key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 75 || event.keyCode == 69) { //Doble key E o K
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 82) { //X16 key R
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
    if (event.keyCode == 83) { //Line key S
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
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
}