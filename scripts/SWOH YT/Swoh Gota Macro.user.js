// ==UserScript==
// @name         Swoh Gota Macro
// @namespace    Pretty Good Gota Script
// @description  A - 16 Split -|- S - Mouse In Center -|- D - Double Split | Q - Triple Split
// @version      1.0
// @author       Editted By Swoh
// @match        http://gota.io/web/*
// @grant        GM_addStyle
// ==/UserScript==

//Social Media Buttons Removal
$(".main-bottom-links").replaceWith("");

//Instructions
var maincontent = document.getElementById("main-content");
  var version = document.createElement("div");
  version.innerHTML = 'Swoh Gota Macro';
  version.id = 'instructions';
  maincontent.appendChild(version);
document.getElementById("instructions").style.textAlign = "center";
document.getElementById("instructions").style.fontSize = "30px";
document.getElementById("instructions").style.color = "white";
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === true) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 65) { //key A
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 68) { //key D
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
    if (event.keyCode == 81) { //key Q
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
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