// ==UserScript==
// @name         WKD dla nas
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  WKD xd
// @author       You
// @match        http://www.wkd.com.pl/
// @grant        none
// ==/UserScript==

(function() {
document.getElementById("from-input").value="Michałowice"; document.getElementById("to-input").value="Warszawa Ochota WKD"; document.getElementById("search-timetable").click();
})();