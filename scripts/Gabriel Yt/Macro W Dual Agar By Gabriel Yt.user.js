// ==UserScript==
// @name         Macro W Dual Agar By Gabriel Yt
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Macro de DUal / Control fácil para buena jugabilidad
// @author       Gabriel YT
// @match        dual-agar.online
// @match        dual-agar.me
// @match        dual-agar.me/dualplus/
// @run-at       document-end
// @grant        none
// ==/UserScript==
 
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
 
var EjectDown = false;
 
var speed = 1; //in ms
 
function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
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
    }a
}
 
//© 2017. t'hen. All Rights Reserved
RAW Paste Data

// ==UserScript==
// @name         Macro W Dual Agar By t'hen
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Macro de DUal / Control fácil para buena jugabilidad
// @author       t'hen
// @match        dual-agar.online
// @match        dual-agar.me
// @match        dual-agar.me/dualplus/
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 1; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
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
    }a
}

//© 2017. t'hen. All Rights Reserved
