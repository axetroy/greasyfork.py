// ==UserScript==
// @name         RmDisabledAttr
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Unblock private chat
// @author       You
// @match        http://klavogonki.ru/gamelist/
// @grant        none
// ==/UserScript==

setTimeout (function() {
    'use strict';

   document.getElementsByTagName("input")[6].removeAttribute("disabled");
   document.getElementsByTagName("input")[6].value = "";
   document.getElementsByTagName("input")[7].removeAttribute("disabled");
}, 5000)();