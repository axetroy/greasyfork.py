// ==UserScript==
// @name           HWM_Battle_Announce
// @namespace      Рианти
// @description    Звуковое оповещение о начавшемся бое
// @version        1
// @include        http://www.heroeswm.ru/war.php*
// ==/UserScript==

if(document.URL.toString().indexOf('lt=-1') == -1) new Audio("http://www.soundjay.com/button/beep-1.wav").play();