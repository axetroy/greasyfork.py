// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://tampermonkey.net/index.php?ext=dhdg
// @grant        none
// ==/UserScript==

var div = document.getElementById("steam_blocked_modal");
if (div) {
    div.style.display = "none"; // Hides it
    // Or
    // div.parentNode.removeChild(div); // Removes it entirely
}