// ==UserScript==
// @name         Agar.io macro split and feed
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Agar macro - W= Feed - E = Tricksplit - Z = Triplesplit - D = Doublesplit - A = Freeze cell - Q = Ultrasplit
// @author       Shards of Dust
// @match        https://agar.io/*
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_A'> Press <b>A</b> to Freeze Cell (Stop Movement)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_D'> Press <b>D</b> to Doublesplit (Split 2x)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_Z'> Press <b>Z</b> to Triplesplit (Split 3x)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_E'> Press <b>E</b> to Tricksplit (Split 4x)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_Q'> Press <b>Q</b> to Ultrasplit (Split 10x)</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_like_mod?'> Like this mod? Know how to improve it? Tell us at <b>shards.dust@gmail.com</b></span></span></center>";
function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 68) { //key D
        split();
        setTimeout(split, speed);
    }
     if (event.keyCode == 90) { //key Z
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
    }
     if (event.keyCode == 69) { //key E
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
    if (event.keycode == 81) { //key Q
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
        setTimeout(split, speed*4);
        setTimeout(split, speed*5);
        setTimeout(split, speed*6);
        setTimeout(split, speed*7);
        setTimeout(split, speed*8);
        setTimeout(split, speed*9);
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