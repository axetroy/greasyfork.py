// ==UserScript==
// @name       mutare armata pt . swordhell
// @namespace niroscript
// @version    0.1
// @description  nirobot
// @match      https://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  
// ==/UserScript==

document.body.style.background = 'orange';
setInterval(
function Spostamento1()
   {
        xajax_provinces_info('provinces');
        xajax_change_current_province(666,1,'village.php',4);
        xajax_change_current_province(666,1,'village.php',9);
        xajax_premiumMoveAll(1);
        xajax_premiumMoveAll(2)
         xajax_premiumMoveAll(3)
        xajax_provinces_info('provinces');
        xajax_change_current_province(666,1,'village.php',9);
        xajax_change_current_province(666,1,'village.php',4);
        xajax_premiumMoveAll(1);
        xajax_premiumMoveAll(2);
        xajax_premiumMoveAll(3)
   },12000)