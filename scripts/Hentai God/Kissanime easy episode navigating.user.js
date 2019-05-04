// ==UserScript==
// @name         Kissanime easy episode navigating
// @namespace    cl.1ck.me
// @version      1.3
// @description  Use the left and right arrow keys to get to the next/previous episodes
// @author       TheTh0rus
// @match        *://kissanime.ru/Anime/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

if(document.contains(document.getElementById("centerDivVideo"))) {
document.getElementsByClassName("divCloseBut")[0].id = "locate";

window.location.hash = "locate";

if(document.getElementsByClassName("barContent")[0].children[0].children[0].children[1].children[0].children[0].id == "btnPrevious" && document.getElementsByClassName("barContent")[0].children[0].children[0].children[1].children[1].children[0].id == "btnNext") {
    var next = document.getElementsByClassName("barContent")[0].children[0].children[0].children[1].children[1].toString();
    var prev = document.getElementsByClassName("barContent")[0].children[0].children[0].children[1].children[0].toString();
} else {

if(document.getElementsByClassName("barContent")[0].children[0].children[0].children[1].children[0].children[0].id == "btnPrevious") {
    var next = "nope";
    var prev = document.getElementsByClassName("barContent")[0].children[0].children[0].children[1].children[0].toString();
}else {
    var next = document.getElementsByClassName("barContent")[0].children[0].children[0].children[1].children[0].toString();
    var prev = "nope";
}
    
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 39) {
        if(next !== "nope") {
        document.location.href = next;
        }
    }
   if (evt.keyCode == 37) {
       if(prev !== "nope") {
        document.location.href = prev;
       }
   }
};
    
}