// ==UserScript==
// @name         Pop-up to cornfirm refresh/exit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  confirm refresh/exit for moomoo.io
// @author       shii
// @match        moomoo.io/
// @grant        none
// ==/UserScript==

window.onbeforeunload = function() {
   return "";
};