// ==UserScript==
// @name         LimotYT Agarup macro
// @namespace    http://tampermonkey.net/
// @version      3.0.1
// @description  W = Macro Feed | G = Double-Split | T = 16-Split | R = Freeze Cell (Only when mouse is stationary)
// @author       LimotYT
// @match        http://www.agarup.us/indexcrazy.html*
// @match        https://www.agarup.us/indexcrazy.html*
// @match        http://www.agarup.us/index.html*
// @match        https://www.agarup.us/index.html*
// @match        http://www.agarup.us/indexinstant.html*
// @match        http://www.agarup.us/indexinstant.html*
// @match        https://www.agarup.us/indexinstant.html*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

// Macro feed

var EjectDown = false;

var speed = 25; //in ms
function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }


// Doublesplit macro

    if (event.keyCode == 71) { //key G
        split();
        setTimeout(split, speed);
    }


// 16-split macro

     if (event.keyCode == 84) { //key T
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }


// Freeze cell (moves mouse to center of window)

    if (event.keyCode == 82) { //key R
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
}


// DO NOT CHANGE ANYTHING BELOW THIS WARNING OR MACRO  WILL NOT WORK

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