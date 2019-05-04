// ==UserScript==
// @name         Wumbo's Agar [E] Ejector!
// @namespace    Agar.io Wumbo's Mass [E] Ejector!
// @version      0.03
// @description  A faster, continuous mass ejector for agar.
// @author       Wumbo
// @license      MIT
// @match        http://agar.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    var amount = 6;
    var duration = 50; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 69) { // KEY_E
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 87}); // KEY_W
                    window.onkeyup({keyCode: 87});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();
