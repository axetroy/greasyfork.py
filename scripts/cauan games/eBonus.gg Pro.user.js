// ==UserScript==
// @name         eBonus.gg Pro
// @namespace    CauanG
// @version      1.0
// @description  Clique automaticamente em Avançar o vídeo e reproduza a seguir.
// @author       CauanG
// @match        https://ebonus.gg/earn-coins/watch/*
// @grant        none
// ==/UserScript==

setInterval(function() {
                  window.location.reload();
                }, 170000); 

$(document).ready(function(){
    var coinsclicker = setInterval(function() {
        ClickNext();
        ClickOnBubble();
    }, 1000);

    window.ClickNext = function(){
        if ($(".coins_popup").length > 0) {
            console.log("clicked");
            $(".coins_popup").click();
        }
    };
    window.ClickOnBubble = function(){
        if ($(".sweet-alert.showSweetAlert.visible").length > 0) {
            console.log("clicked");
            $(".confirm").click();
        }
    };
});