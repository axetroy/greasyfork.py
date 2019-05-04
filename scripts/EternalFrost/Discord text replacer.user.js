// ==UserScript==
// @name         Discord text replacer
// @namespace    EFDiscordText
// @version      1.0
// @description  Replaces discord text you type with the specified text
// @author       EternalFrost#0955
// @match        https://discordapp.com/*
// @grant        none
// ==/UserScript==

(function() {
    var input = null;
    var replace = {"/lenny ": "( ͡° ͜ʖ ͡°) "} // Put whatever you want here
    function run() {
        let new_input = document.querySelector('textarea')
        if (input == null || new_input !== input) {
            console.log("[CUSTOM COMMANDS] Init....")
            input = document.querySelector('textarea')
            input._valueTracker.stopTracking()
            input.addEventListener("keyup", function() {
                for (let value of Object.keys(replace)) {
                    input.value = input.value.replace(value, replace[value])
                }
            });
            console.log("[CUSTOM COMMANDS] Done")
        }
    }
    setInterval(run, 200)
})();