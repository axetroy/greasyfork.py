// ==UserScript==
// @name         Dilbert hotkeys
// @namespace    Danielv123
// @version      1.0
// @description  Adds hotkeys for easier navigation on dilbert.com
// @author       You
// @match        http://dilbert.com/strip/*
// @grant        none
// @require      https://greasyfork.org/scripts/7927-mousetrap/code/Mousetrap.js?version=35548
// ==/UserScript==

Mousetrap.bind("right", ()=>{
    let button = document.querySelector(".nav-comic.nav-right");
    if(button) button.click();
});

Mousetrap.bind("left", ()=>{
    let button = document.querySelector(".nav-comic.nav-left");
    if(button) button.click();
});