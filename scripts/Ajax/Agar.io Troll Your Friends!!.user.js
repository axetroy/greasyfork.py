// ==UserScript==
// @name         Agar.io Troll Your Friends!!
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Forces the installer to split every time they press w LOL
// @author       Jack Burch
// @match        http://abs0rb.me/*
// @match        http://agar.io/*
// @match        http://agarabi.com/*
// @match        http://agarly.com/*
// @match        http://en.agar.bio/*
// @match        http://agar.pro/*
// @match        http://agar.biz/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
window.addEventListener('keydown', keydown);
function keydown(event) {
    if (event.keyCode == 87) {
        $("body").trigger($.Event("keydown", { keyCode: 32}));
        $("body").trigger($.Event("keyup", { keyCode: 32}));
    }
}



//#JasonMcAssHatforTrumpsVP