// ==UserScript==
// @name         Strzelanie z 2 broni jednocześnie
// @namespace    KROKIk
// @version      1
// @description  Kliknij prawym przyciskiem myszy by strzelić drugą bronią
// @author       KROKIk
// @match        http://vertix.io/
// @grant        none
// ==/UserScript==

$("#cvs").mousedown(function(ev){
      if(ev.which == 3)
      {
  playerSwapWeapon(player, 1);
 setTimeout(shootBullet(player), 10);
playerSwapWeapon(player, 1);
      }
});