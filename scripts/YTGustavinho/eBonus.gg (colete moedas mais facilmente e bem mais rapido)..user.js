// ==UserScript==
// @name         eBonus.gg (colete moedas mais facilmente e bem mais rapido).
// @namespace    YTGustavinho
// @version      1.1
// @description  Auto clique no próximo vídeo, clique automático na bolha e recarrega a página automaticamente com vídeos quebrados.
// @author       YTGustavinho
// @match        https://ebonus.gg/earn-coins/*
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