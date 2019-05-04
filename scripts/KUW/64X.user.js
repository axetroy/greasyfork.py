// ==UserScript==
// @name         64X
// @namespace    Tool
// @version      1.0
// @description  4 = 64X
// @author       KUW
// @match        http://gota.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==
(function() {
    var amount = 6;
    var duration = 5;

    var overwriting = function(evt) {
        if (evt.keyCode === 84) {
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32});
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();
(function() {
    var amount = 8;
    var duration = 5;

    var overwriting = function(evt) {
        if (evt.keyCode === 89) {
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32});
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();