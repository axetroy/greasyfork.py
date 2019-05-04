// ==UserScript==
// @icon	http://file1.npage.de/007324/77/bilder/favicon.ico
// @name        Translator
// @name:de     Übersetzer
// @namespace   http://scriptz.de.to/
// @description Press (F2) to Translate.
// @description:de Drücken Sie (F2) zum übersetzen.
// @include     *://*
// @version     4.0.0.5
// @author  Scriptz
// @copyright   2013+ , Scriptz
// @grant unsafeWindow
// @supportURL mailto:scriptz@mail1a.de?subject=Translator
// @license Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License; http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript==

// ==VAR==
var jslink = "javascript";
// ==============

// ==Function==
    unsafeWindow.translate = function(){
        window.location="http://translate.google.com/translate?sl=auto&u="+window.location;
        };
// ==============

// ==Key==
document.onkeydown= openPage ;
function openPage(e) {
e= window.event ? event : e;
    if (e.keyCode == 113 ) {location.href=jslink+":translate()";}
}
// ==============