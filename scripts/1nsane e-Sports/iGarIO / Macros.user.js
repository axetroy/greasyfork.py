// ==UserScript==
// @name         iGarIO / Macros
// @namespace    igario.gq
// @version      0.1
// @description  E = Macro Feed | G = Double-Split | T = 16-Split | C = Curve-Trick | S = Freeze Cell
// @author       Diversity
// @match        http://agar.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==
// © 2016 igario.gq

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

// Instructions for Eject Some mass                                                                                    v            v
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_D'> Press <b>E</b> to Eject mass</span></span></center>";

// Instructions for doublesplt                                                                                      v            v
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_D'> Press <b>G</b> to doublesplit</span></span></center>";

// Instructions for 16-splt                                                                                           v               v
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_Shift'>Press <b>T</b> to 16-split</span></span></center>";

// Instructions for curve-tricksplit                                                                                v           v
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_E'>Press <b>C</b> to curve-tricksplit</span></span></center>";

// Instructions for freeze cell                                                                                     v            v
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_A'> Press <b>S</b> to freeze your cell</span></span></center>";


// Macro feed

var EjectDown = false;

var speed = 25; //in ms
function keydown(event) {
    if (event.keyCode == 69 && EjectDown === false) { // key E
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



// Curve-trick macro

     if (event.keyCode == 67) { //key C
        split();
        setTimeout(split, speed*5);
        setTimeout(split, speed*10);
        setTimeout(split, speed*15);
    }



// Freeze cell (moves mouse to center of window)

    if (event.keyCode == 83) { //key S
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
}



// DO NOT CHANGE

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