// ==UserScript==
// @name         hi
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  try to take over the world!
// @author       You
// @match        https://gota.io/web/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
var Feed = false;
var Dingus = false;
var imlost = 25;
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_e'> Press <b>E</b> or <b>4</b> to split 4x</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_3'> Press <b>3</b> to split 3x</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_d'> Press <b>D</b> or <b>2</b> to split 2x</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_q'> Press and hold <b>Q</b> for macro feed</span></span></center>";
load();
function load() {
    if (document.getElementById("overlays").style.display!="none") {
        document.getElementById("settings").style.display = "block";
        if (document.getElementById('showMass').checked) {document.getElementById('showMass').click();}
        document.getElementById('showMass').click();
        if (document.getElementById('darkTheme').checked) {document.getElementById('darkTheme').click();}
        document.getElementById('darkTheme').click();
        // I changed the above because now agario 'remembers' your preferences, but doesn't actually work, so if they're already set to be true, you need to undo it, then re click to true
    } else {
        setTimeout(load, 100);
    }
} 
function keydown(event) {
    if (event.keyCode == 81) {
        Feed = true;
        setTimeout(fukherriteindapussie, imlost);
    } // Tricksplit
    if (event.keyCode == 69 || event.keyCode == 52) { //( ͡° ͜ʖ ͡°)
        ilikedick();
        setTimeout(ilikedick, imlost);
        setTimeout(ilikedick, imlost*2);
        setTimeout(ilikedick, imlost*3);
    } // Triplesplit
    if (event.keyCode == 65 || event.keyCode == 65) {
        ilikedick();
        setTimeout(ilikedick, imlost);
        setTimeout(ilikedick, imlost*2);
    } // Doublesplit
    if (event.keyCode == 68 || event.keyCode == 68) {
        ilikedick();
        setTimeout(ilikedick, imlost);
    } // Split
    if (event.keyCode == 49) {
        ilikedick();
    }
} // When Player Lets Go Of Q, It Stops Feeding
function keyup(event) {
    if (event.keyCode == 81) {
        Feed = false;
    }
    if (event.keyCode == 79) {
        Dingus = false;
    }
}
// Feed Macro With Q
function fukherriteindapussie() {
    if (Feed) {
        window.onkeydown({keyCode: 87});
        window.onkeyup({keyCode: 87});
        setTimeout(fukherriteindapussie, imlost);
    }
}
function ilikedick() {
    $("body").trigger($.Event("keydown", { keyCode: 32}));
    $("body").trigger($.Event("keyup", { keyCode: 32}));
}
//jeje ( ͡° ͜ʖ ͡°)