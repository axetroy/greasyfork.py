// ==UserScript==
// @name         Steam auto skip "continue to external site"
// @namespace    https://steamcommunity.com/profiles/76561197991952155
// @version      0.1
// @description  Will automatically click the confirm button when clicking an external link in steamcommunity. Be careful to not click on suspicious links !
// @author       Spychopat
// @match        https://steamcommunity.com/linkfilter/?url=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("proceedButton").click();
})();