// ==UserScript==
// @name         HWM_ReplaceBattlesLink
// @namespace    Небылица
// @version      1.0
// @description  Заменяет ссылку "Битвы" в меню с последних сражений на все
// @author       Небылица
// @include      /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/.+/
// @exclude      /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/(login|war|cgame|frames|chat|chatonline|ch_box|chat_line|ticker|chatpost)\.php.*/
// ==/UserScript==

(function() {
    "use strict";

    document.querySelector("a[href='bselect.php']").setAttribute("href", "bselect.php?all=1");
})();