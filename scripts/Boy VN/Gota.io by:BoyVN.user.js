// ==UserScript==
// @name         Gota.io by:BoyVN
// @namespace    https://www.youtube.com/channel/UCIpCflcKEN9YgaO9qDahpRg
// @version      1.6.2
// @description  Double Split E TripelSplit Q Happy Your Enjoy
// @match        http://gota.io/web/*
// @author       BoyVN
// @include       http:/http://gota.io/web/*
// @include       http:http://gota.io/web/*
// @exclude       http:http://gota.io/web/*
// @run-at       document-end
// ==/UserScript==
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
var Feed = false;
var Speed = 30;
// @icon http:// @icon http://www.example.org/icon.png

function keydown(event) {
    // Feed Macro
    if (event.keyCode == 69 )                                        // Q
    {
        Feed = true;
        setTimeout(mass, Speed);
    }// Center
    if (event.keyCode == 83) {                                       // E
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
    // Tricksplit
    if (event.keyCode == 16 || event.keyCode == 52) {                // Shift and E
        split();
        setTimeout(split, Speed);
        setTimeout(split, Speed*2);
        setTimeout(split, Speed*3);
    } // Triplesplit
    if (event.keyCode == 82 || event.keyCode == 'yourkey') {         // Shift and Put in Your Key
        split();
        setTimeout(split, Speed);
        setTimeout(split, Speed*2);
    } // Doublesplit
    if (event.keyCode == 81 || event.keyCode == 'yourkey') {         // Z and Put in Your Key
        split();
        setTimeout(split, Speed);
    }// Split
    if (event.keyCode == 'yourkey' || event.keyCode == 'yourkey2') { // Put in Your Key
        split();
    }

} // When Player Lets Go Of E, It Stops Feeding
function keyup(event) {
    if (event.keyCode == 80) {
        Feed = false;
    }