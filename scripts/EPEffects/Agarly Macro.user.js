// ==UserScript==
// @name         Agarly Macro
// @namespace    http://agarly.com
// @version      3.0
// @description  Agarly.com Macro
// @author       Sopyan & EPEffects
// @match        http://www.agarly.com/
// @grant        none
// ==/UserScript==

(function() {
    var amount = 10;
    var duration = 5; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 69) {
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 87});
                    window.onkeyup({keyCode: 87});
                }, i * duration);
            }
        }
    };

    w