// © 2017. Sry Clan. All Rights Reserved
// ==UserScript==
// @name        Sry Clan
// @namespace    http://tampermonkey.net/
// @version      3.6
// @description  Press Z for doublesplit
// @author       SRY Clan
// @match        http://agar.io/*
// @match        http://petridish.pw/*
// @match        http://agarly.com/*
// @match        http://agar.biz/*
// @match        http://en.agar.bio/*
// @match        http://agar.red/*
// @match        http://agario.biz/*
// @match        http://germs.io/*
// @match        http://agar.re/*
// @match        http://alis.io/*
// @match        http://agarix.esy.es/
// @match        https://gota.io
// @match        http://gaver.io
// @run-at       document-end
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
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_youtube channel'> If you like my Macro, please check out the official <b>Sry</b> <b>Clan</b> Vk!</span> https://vk.com/sryclan</span></center>";
function keydown(event) {
    if (event.keyCode == 90) { //key Z
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
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
//© 2017. Sry Clan. All Rights Reserved﻿