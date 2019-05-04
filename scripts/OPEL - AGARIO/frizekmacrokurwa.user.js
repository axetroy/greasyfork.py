// © 2017. gowno Clan. All Rights Reserved
// ==UserScript==
// @name         frizekmacrokurwa
// @namespace    http://tampermonkey.net/
// @version      3.6
// @description  FRIZEK MAKRO KURWA KING POKA BOBRA
// @author       FRIZEK
// @match        http://alis.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 65; 

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 17) { //key Ctrl
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 81) { //key q
        split();
        setTimeout(split, speed);
    }
     if (event.keyCode == 9) { //key Tab
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
    }
     if (event.keyCode == 51) { //key 3
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
    }
     if (event.keyCode == 16) { //key Shift
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
     if (event.keyCode == 52) { //key 4
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
    if (event.keyCode == 65) { //key A
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
 }
    if (event.keyCode == 70) { //key F
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
//© 2017. Rekt Clan. All Rights Reserved