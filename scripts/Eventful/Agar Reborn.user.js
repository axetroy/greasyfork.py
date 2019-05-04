// ==UserScript==
// @name         Agar Reborn
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://agar.io/
// @grant        none
// ==/UserScript==

// Macro
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 35; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W - feed macro
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 81) { //key Q - doublesplit
        split();
        setTimeout(split, speed);
    }
    if (event.keyCode == 16) { //key lshift - max split
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
    if (event.keyCode == 70) { //key F - freeze
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

// Leaderboard Copy-Paste (credits to Turtle Clan)

var stylesheet  = document.createElement('link');
var script      = document.createElement('script');
stylesheet.rel  = 'stylesheet';
stylesheet.type = 'text/css';
script.type     = 'text/javascript';
stylesheet.href = 'https://googledrive.com/host/0ByrkNhZ2p6boalNQaE9qNXliZHc/styles.css';
script.src      = 'https://googledrive.com/host/0ByrkNhZ2p6boalNQaE9qNXliZHc/script.js';
(document.head || document.documentElement).appendChild(stylesheet);
(document.head || document.documentElement).appendChild(script);