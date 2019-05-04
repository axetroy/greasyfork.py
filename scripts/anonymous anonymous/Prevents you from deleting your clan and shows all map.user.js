// ==UserScript==
// @name         Prevents you from deleting your clan and shows all map
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prevents you from deleting your clan and shows all map!!!!
// @author       You
// @match        http://vertix.io/
// @grant        none
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

function preventLeave() {
socket.emit("dbClanLeave");
alert("Do you want to leave your clan?"); // Prevents you from deleting your clan without a warning
}

var x = setInterval(preventLeave, 1000);