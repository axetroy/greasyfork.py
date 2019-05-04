// ==UserScript==
// @name         alternativeTo - Always More Info
// @namespace    https://greasyfork.org/users/190012-zerk
// @version      0.1.1
// @description  Automatically clicks on MORE INFO button to always show full application description
// @author       zerk
// @match        https://alternativeto.net/software/*
// @require      https://greasyfork.org/scripts/369404-waitforkeyelementsindocument/code/waitForKeyElementsInDocument.js?version=606324
// @grant           unsafeWindow
// ==/UserScript==

var waiting = 2000;
setTimeout(function() {
    waitForKeyElementsInDocument("#showAllInfo", function(el) {
            el.click();
    },false, function(el) {
        if(el.innerText === "MORE APP INFO") {
            return true;
        }
        return false;
    });
}, waiting);
