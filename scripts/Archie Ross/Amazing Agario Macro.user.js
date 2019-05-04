// ==UserScript==
// @name         Amazing Agario Macro
// @namespace    Double Split, Triple Split, 16 Split Hotkeys And Quicker Feeding
// @version      1.4
// @description  - Key Z - Max/16 Split - Key Q- Macro Feed
// @author       Eclipse
// @match        http://germs.io/*
// @match        http://micos.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
function load() {
}
(function() {
    var amount = 8;
    var duration = 50;

    var overwriting = function(evt) {
        if (evt.keyCode === 90) { 
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32}); // 32 - Space Bar
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 10; //in ms

function keydown(event) {
    if (event.keyCode == 81 && EjectDown === false) { // key Q
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 186) { //key ;
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
}

function keyup(event) {
    if (event.keyCode == 81) { // key Q
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87});
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }
}

function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key space
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
}
// Still Looking Through My Code Are We ( ͡° ͜ʖ ͡°)