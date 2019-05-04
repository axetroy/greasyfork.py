// © 2018.  JasteR. All Rights Reserved
// ==UserScript==
// @name         MacroFast (Agarix)
// @namespace    http://tampermonkey.net/
// @version      3.3
// @description  AGARIX MACROS - W=FEED - G =16 CELLS - F =TRIPLESPLIT - D =DOUBLESPLIT - S =FREEZE CELL
// @author       JasteR
// @icon         https://i.imgur.com/QwfWT4Z.jpg
// @match        http://agarix.ru
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_S'> Нажми <b>S</b> для Останвки шарика </span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_D'> Нажми <b>D</b> для Двойного Деления </span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_F'> Нажми <b>F</b> для Тройного деления </span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_G'> Нажми <b>G</b> для Максимального деления </span></span></center>";

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 68) { //key D
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2); 
    }
     if (event.keyCode == 70) { //key F
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
     if (event.keyCode == 71) { //key G
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
        setTimeout(split, speed*4);
        setTimeout(split, speed*5);
        setTimeout(split, speed*6); 
     }
    if (event.keyCode == 83) { //key S
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
//© 2017. sSClan. All R