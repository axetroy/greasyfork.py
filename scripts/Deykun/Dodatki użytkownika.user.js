// ==UserScript==
// @name        Dodatki użytkownika
// @namespace   http://www.wykop.pl/ludzie/Deykun
// @description Przywraca zakładkę Dodatki na profilach użytkowników którą jakiś geniusz usunął ze sobie tylko znanych powodów.
// @version     1.1
// @author      Deykun
// @include     htt*wykop.pl/ludzie*
// @grant       none
// @run-at		document-end
// ==/UserScript==
$(".fix-b-border li:contains(obserwowani)" ).after('<li><a href="https://www.wykop.pl/ludzie/addons/'+$('h2 span').first().text()+'/"><span>dodatki</span></a></li>');