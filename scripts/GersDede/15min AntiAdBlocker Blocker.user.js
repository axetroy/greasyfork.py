// ==UserScript==
// @name         15min AntiAdBlocker Blocker
// @name:lt      15min Reklamos blokavimo blokavimo blokavimas :D
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block the blocking of blocking ads in the 15min.lt
// @description:lt Blokuok blokavima kuris blokuoja blokavima
// @author       gerasDede
// @match        http://www.15min.lt/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var keep = true;
    var body = $("body")[0].outerHTML;
    $("#adblock-content").remove();
    var itvl = setInterval(function(){
        if(keep){
            if($(".article").length < 1){
                document.body.innerHTML = body;
                keep = false;
                clearInterval(itvl);
            }
        }
    }, 500);
})();