// ==UserScript==
// @name         TurkerHub Speech Recognition test.
// @namespace    salembeats
// @version      0.1
// @description  Testing out Chrome's current variant of the Speech Recognition API on our favorite mark, TurkerHub.
// @author       salembeats
// @include      https://turkerhub.com/threads/*
// @grant        none
// ==/UserScript==

var myApp = {};

myApp.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new myApp.SpeechRecognition();
//recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

let textbox = document.querySelector("iframe.redactor_textCtrl").contentDocument.querySelector("body");

textbox.click();
textbox.focus();
let changeEvent = new Event("change");
textbox.dispatchEvent(changeEvent);

recognition.start();

recognition.addEventListener("result", event => {
    console.log(event);
    for(let result of event.results) {
        if(result.isFinal && result[0].confidence >= 0.6) {
            textbox.innerText += result[0].transcript;
        }

    }
});