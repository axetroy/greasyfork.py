// ==UserScript==
// @name         Karnage Boost, no kick
// @namespace    http://tampermonkey.net/
// @version      2.01
// @description  Auto spawner karnage + Autofires to prevent getting kicked
// @author       meatman2tasty
// @match        http://karnage.io/
// @grant        none
// ==/UserScript==

function respawn() {
    setTimeout(respawn, 50);
    if (inWindow) {
         enterGame ('player');
    }
}
respawn();

setInterval(function(){ 
    setTimeout(MOUSE_DOWN = 1, 2);
}, 10);

setInterval(function(){ 
    setTimeout(inWindow= true, 2);
}, 10);
