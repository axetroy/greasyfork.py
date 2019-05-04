// ==UserScript==
// @name         Wizey/iZey
// @namespace    http://tampermonkey.net/
// @version      3.6
// @description  Best Macro
// @author       iZey/Wizey
// @match        http://agar.io/*
// @match        http://old.ogarul.io/*
// @match        http://gota.io/web/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_a or f'><b>▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</b></span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_a or f'> Press <b>A</b> or <b>F</b> to Freeze Cell (Stop Movement)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_ctrl'> Press <b>Q</b> or <b>2</b> to Doublesplit (Split 2x)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_tab'> Press <b>Tab</b> or <b>3</b> to Triplesplit (Split 3x)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_shift'> Press <b>Shift</b> to Tricksplit (Split 4x)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_shift'> <b>Creator</b> Wizey/iZey</span></span></center>";
function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 81) { //key Q
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 50) { //key 2
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
     if (event.keyCode == 16) { //key 4
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