// ==UserScript==
// @name        HWM_WH_Hightlight_Arts_IDs
// @namespace   Рианти
// @description Выводит айди артов в протоколах склада
// @include     http://www.heroeswm.ru/sklad_log.php*
// @version     1
// @grant       none
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/&nbsp;&nbsp;(.+)<!--(\d\d+)--><BR>/gi, '&nbsp;&nbsp;<span title="Айди артефакта: $2">$1 <b style="font-size:10px"><i>Айди артефакта: $2</i></b><span><!--$2--><BR>');