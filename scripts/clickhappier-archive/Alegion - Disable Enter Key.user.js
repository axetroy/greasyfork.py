// ==UserScript==
// @name         Alegion - Disable Enter Key
// @description  Disable Enter Key on Alegion HITs
// @author       Kerek
// @namespace    Kerek
// @version      0.1
// @match  https://staging.alegion.com/render/hit?*
// ==/UserScript==

document.addEventListener("keydown",function(i) {
    if (i.keyCode == 13) {
        i.preventDefault();
    }
});