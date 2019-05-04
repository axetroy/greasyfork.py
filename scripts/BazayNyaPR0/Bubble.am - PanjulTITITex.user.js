// ==UserScript==
// @name         Bubble.am - PanjulTITITex
// @namespace    http://bubble.am/
// @version      0.1
// @description  Made by JP
// @author       Jul Panjul
// ==/UserScript==

(function() {
    var amount = 4;
    var duration = 50; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 84) { // KEY_T
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

(function() {
    var amount = 4;
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

(function() {
    var amount = 2;
    var duration = 50; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 71) { // KEY_G
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