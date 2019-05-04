// ==UserScript==
// @name         niSoEditor - Split מהיר
// @namespace    niSoTheOne
// @version      11.11
// @description  תלחצו D כדי להתפצל 16 +
// @author       Niso (Happy Cat)
// @license      MIT
// @match        http://www.blobs.co.il/*
// @grant        נISRAEL
// @run-at       niSoEditor
// ==/UserScript==

(function() {
    var amount = 6;
    var duration = 50; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 90) { // KEY_D
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32}); // KEY_SPACE
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();