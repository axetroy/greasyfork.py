// ==UserScript==
// @name         Shadow - Agar.io 16 Split
// @namespace    Macro Split
// @version      0.01
// @description  Press S To Spilt 16 times
// @author       Shadow
// @license      MIT
// @match        http://agar.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    var amount = 6;
    var duration = 50; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 90) { // KEY_S
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32}); // KEY_S
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();