// ==UserScript==
// @name         Macro double split + split x 16 + w  By : Felix Mora
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  AWESOME
// @author       You
// @match        http://cell.sh/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms

function keydown(event) {
    if (event.keyCode == 87) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 81) {
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 69) {
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
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