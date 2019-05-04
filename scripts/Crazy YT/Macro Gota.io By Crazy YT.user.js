// ==UserScript==
// @name         Macro Gota.io By Crazy YT
// @namespace    https://www.youtube.com/channel/UCHmGqV_bj9QgpvVK6rhZJLQ
// @version      2.0
// @description  E is 'W' Macro, T is Tricksplit, R is Triplesplit, Q is Doublesplit. Easily configurable keys in code.
// @author       Crazy YT
// @match        http://gota.io/*
// @match        https://gota.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
var Feed = false;
var Speed = 1;

//Funtions
function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32}));
    $("body").trigger($.Event("keyup", { keyCode: 32}));
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
    if (event.keyCode == 69 )                                        // E
    {
        Feed = true;
        setTimeout(mass, Speed);
    }// Center
    if (event.keyCode == 83) {                                       // S
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
    // Tricksplit
    if (event.keyCode == 84 || event.keyCode == 52) {                // T
        split();
        setTimeout(split, Speed);
        setTimeout(split, Speed*2);
        setTimeout(split, Speed*3);
    } // Triplesplit
    if (event.keyCode == 82 || event.keyCode == 'yourkey') {         // R and Put in Your Key
        split();
        setTimeout(split, Speed);
        setTimeout(split, Speed*2);
    } // Doublesplit
    if (event.keyCode == 81 || event.keyCode == 'yourkey') {         // Q and Put in Your Key
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