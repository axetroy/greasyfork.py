// ==UserScript==
// @name         Pikabu-like navigation
// @namespace    http://*.*/
// @version      0.1
// @author       Efog
// @grant        none
// @description  Scroll up/down using Z/C keys
// ==/UserScript==

document.addEventListener("keydown", function(e) {
    if (document.activeElement.nodeName == "BODY") {
        if (e.keyCode == 90) { //Z
            document.body.scrollTop -= 45;
        }

        if (e.keyCode == 67) { //C
            document.body.scrollTop += 45;
        }
    }
});