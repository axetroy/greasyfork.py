// ==UserScript==
// @name       Recompensa
// @namespace  nirobot
// @version    0.1
// @description  Incasare diamant de la sondaj
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  
// ==/UserScript==

document.body.style.background = 'orange';
setInterval(
function Spostamento1()
   {
       javascript:void(xajax_showPoll(containersStuff.findContaner({saveName:'polls',title:'Sondaje',template:'untabbed'})))
       BUTTON FORM=ID:anketa ATTR=NAME:vote
   },12000)