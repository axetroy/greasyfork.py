// ==UserScript==
// @name ReCaptcha Automatizer
// @description Passes ReCaptcha automatically as long as no suspicious traffic was registered.
// @namespace Violentmonkey Scripts
// @match https://www.google.com/recaptcha/*
// @grant none
// @version 0.0.1.20190414202433
// ==/UserScript==

function Sleep(milliseconds) {
     return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function Click() {
     await Sleep(700); // Pausiert die Funktion für X Millisekunden
     document.getElementsByClassName('recaptcha-checkbox-checkmark')[0].click();       
     console.log("erster Klick");
}

var oldOnload = window.onload;

window.onload = function () {

    if (typeof oldOnload == 'function') {
       oldOnload();
    }
       
    Click();
      
} 