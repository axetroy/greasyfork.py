// ==UserScript==
// @name         TurkerHub Show Me Your TTS
// @namespace    salembeats
// @version      4
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/threads/*
// @grant        none
// ==/UserScript==

var voices = [];

(function main() {

    window.speechSynthesis.cancel();

    var messages = document.querySelectorAll(".messageText");

    window.speechSynthesis.getVoices();

    window.speechSynthesis.onvoiceschanged = function() {
        voices = window.speechSynthesis.getVoices();
        console.log("VOICES: " + voices);
    };

    messages.forEach( el => {
        var elementText = el.innerText;
        var newButton = document.createElement("BUTTON");
        newButton.innerText = "Show me your TTS";
        newButton.addEventListener('click', function(e) {
            console.log(elementText);
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            var msg = new SpeechSynthesisUtterance(elementText);
            msg.voice = voices.filter(function(voice) {return voice.name.toLowerCase().includes("female");})[0];
            msg.rate = 1;
            window.speechSynthesis.speak(msg);
        });
        el.insertAdjacentElement("beforeend", newButton);
    });
})();