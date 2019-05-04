// ==UserScript==
// @name         ASDFiles Sem Espera
// @name:en      ASDFiles Timer Skipper         
// @namespace    none
// @version      0.1
// @description  Pula a Espera de 60 Segundos!
// @description:en  Just skipping 60 seconds wait
// @author       Fukoji
// @match        http://asdfiles.com/*
// @grant        none
// ==/UserScript==

(function() {
    console.log("Download Now!");
    setTimeout(function(){
        seconds = 0;
    }, 1500);
})();