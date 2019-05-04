// © 2018.  Dimchik. All Rights Reserved
// ==UserScript==
// @name         Macro Script Agarix
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  Агарикс - W=Кормить - D = 6x - S =стоп шар G = 16x
// @author       Dimchik
// @match        http://agarix.ru
// @run-at       document-end
// @grant        none
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_S'> Нажми <b>S</b> для Останвки шарика </span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_D'> 
Нажми <b>G</b> для 6x деления </span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_G'> 
Нажми <b>G</b> для 16x деления </span></span></center>";

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);

    }
     if (event.keyCode == 71) { //key D
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
        setTimeout(split, speed*4);
        setTimeout(split, speed*5);
        setTimeout(split, speed*6); 
     } 
      
     if (event.keyCode == 71) { //key G
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
        setTimeout(split, speed*10); 
        setTimeout(split, speed*12); 
        setTimeout(split, speed*13); 
        setTimeout(split, speed*14); 
        setTimeout(split, speed*15); 
        setTimeout(split, speed*16); 
                                                                           
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
//© 2018. Dimchik All R
