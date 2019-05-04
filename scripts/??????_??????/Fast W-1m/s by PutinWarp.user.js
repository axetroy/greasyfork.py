// ==UserScript==
// @name         Fast W-1m/s by PutinWarp
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Alis.io hack by PutinWarp
// @author       (<SplinN>)
// @match        http://alis.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 0.00000001; 

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { 
        EjectDown = true;
        setTimeout(eject, speed);
    }
}
function keyup(event) {
    if (event.keyCode == 87) { 
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87}); 
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }
}
alert("Check out my account for new script!");
//All copypastes will be punished.