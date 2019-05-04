// ==UserScript==
// @name         Agar.io Jungle Viruses
// @version      0.1
// @namespace    http://tampermonkey.net/
// @description  u.u
// @author       NEL99
// @match        http://agar.io/*
// @grant        none
// ==/UserScript==

window.jungleVirus = function() { var XML = new XMLHttpRequest(); XML.open("GET", "http://agar.io/agario.core.js", true);
    XML.onreadystatechange = function() {
        if (XML.readyState == 4) {
            var virus = XML.responseText;
            var jungleVirusValue = 145;
            virus = virus.replace(/(\+\d+\.\d+\;l\=\(\w\&\d\|\d\)\=\=\d\&\(\w\[\w\>>\d\]\|\d\)\!\=\d\?l\+)\d+\.\d+(\:l\;)/i, "$1 jungleVirusValue $2");
            eval(virus);
        }
    };
    XML.send(null);
};
window.onload = function(){ jungleVirus(); };