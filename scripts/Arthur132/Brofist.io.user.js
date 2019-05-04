// ==UserScript==
// @name         Brofist.io
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Enjoy
// @author       You
// @match        http://brofist.io/modes/hideAndSeek/c/index.html
// @grant        none
// ==/UserScript==

document.onkeydown = function(event) {
 if (event.keyCode == 49){
  mode.spd=3.5
 }
 if (event.keyCode == 50) {
  mode.player.gpData.p.collisionResponse=0;
 }
 if (event.keyCode == 53) {
  mode.player.gpData.p.gravityScale = 1;
 }
 if (event.keyCode == 52) {
  mode.player.gpData.p.gravityScale = -1;
 }
 if (event.keyCode == 51) {
  mode.player.gpData.p.collisionResponse=1;
 }
}
