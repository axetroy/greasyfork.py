// ==UserScript==
// @name         MOS-cow
// @namespace    
// @version      0.2
// @description  Helps to reduce annoyance from using My Oracle Support https://support.oracle.com
// @author       Timur Akhmadeev
// @match        https://support.oracle.com/*
// @grant        none
// ==/UserScript==

(function() {
    var d = new Date();
    d.setDate(d.getDate() + 100);
    ts = d.getTime();
    for (i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k.indexOf("oracle.adfinternal.view.rich.sessionKey") >= 0) {
            localStorage.setItem(k, ts);
        }
    }
})();