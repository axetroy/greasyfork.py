// ==UserScript==
// @name         Macro Gota.io By BoyVN
// @namespace    http://tampermonkey.net/
// @version      1.19
// @description  E is 'W' Macro, Z and 4 is Tricksplit, Q is Triplesplit, E is Doublesplit, Left Click is Space, Right Click is Feed/Macro, Mouse Click is Tricksplit. Easily configurable keys in code. Credits to Jack Burch AND Tom Burris
// @author       Kaic YT
// @match        http://gota.io/*
// @match        https://gota.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
var Feed = false;
var Speed = 25;

//Funtions
function split() {
    $("body").trigger($.Event("keydown", { keyCode: 11}));
    $("body").trigger($.Event("keyup", { keyCode: 11}));
}
function mass() {
    if (Feed) {
        window.onkeydown({keyCode: 87});
        window.onkeyup({keyCode: 87});
        setTimeout(mass, Speed);
    }
}

function keydown(event) {
    // Feed Macro
    if (event.keyCode == 69 )                                        // Q
    {
        Feed = true;
        setTimeout(mass, Speed);
    }// Center
    if (event.keyCode == 83) {                                       // z
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
    // Tricksplit
    if (event.keyCode == 16 || event.keyCode == 52) {                // Z and 4
        split();
        setTimeout(split, Speed);
        setTimeout(split, Speed*2);
        setTimeout(split, Speed*3);
    } // Triplesplit
    if (event.keyCode == 82 || event.keyCode == 'yourkey') {         // Q and Put in Your Key
        split();
        setTimeout(split, Speed);
        setTimeout(split, Speed*2);
    } // Doublesplit
    if (event.keyCode == 81 || event.keyCode == 'yourkey') {         // E and Put in Your Key
        split();
        setTimeout(split, Speed);
    }// Split
    if (event.keyCode == 'yourkey' || event.keyCode == 'yourkey2') { // Put in Your Key
        split();
    }

} // When Player Lets Go Of E, It Stops Feeding
function keyup(event) {
    if (event.keyCode == 69) {
        Feed = false;
    }

}