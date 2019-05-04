// ==UserScript==
// @name         Spelpaus remover Betfair SE
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Removes the spelpaus banner on top of the site betfair.se as well as the annoying session info popup.
// @author       You
// @match        https://*.betfair.se/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle("#ssc-hbc {display: none;}");

setInterval ( function () {
    if(document.getElementById("closeRegulatoryModal")){
        document.getElementById("closeRegulatoryModal").click();
    };
}, 5000);
