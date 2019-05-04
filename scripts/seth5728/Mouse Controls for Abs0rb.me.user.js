// ==UserScript==
// @name         Mouse Controls for Abs0rb.me
// @namespace    http://abs0rb.me/
// @version      1.0
// @description  Use the mouse to play on abs0rb.me or agar.io! Left click is split and right click is eject.
// @author       Seth
// @match        http://abs0rb.me/
// @grant        none
// ==/UserScript==

(function() {
    window.addEventListener('mousedown', mousedown);
    window.addEventListener('mouseup', mouseup);
    var EjectDown = false;

    function mousedown(event) {
        switch (event.button) {
            case 0: // Left click
                $("body").trigger($.Event("keydown", { keyCode: 32})); // Space
                break;
            case 2: // Right click
                $("body").trigger($.Event("keydown", { keyCode: 87})); // W
                EjectDown = true;
                break;
        }
    }

    function mouseup(event) {
        switch (event.button) {
            case 0: // Left click
                $("body").trigger($.Event("keyup", { keyCode: 32})); // Space
                break;
            case 2: // Right click
                $("body").trigger($.Event("keyup", { keyCode: 87})); // W
                EjectDown = false;
                break;
        }
    }
})();