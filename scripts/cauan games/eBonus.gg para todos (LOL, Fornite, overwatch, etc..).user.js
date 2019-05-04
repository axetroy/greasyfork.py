// ==UserScript==
// @name         eBonus.gg para todos (LOL, Fornite, overwatch, etc..)
// @namespace    CauanG
// @version      1.0
// @description  Este é apenas um clique auxiliar para verificar se os vídeos estão jogando e recebendo moedas corretamente.
// @author       CauanG
// @match        *://ebonus.gg/earn-coins/*
// @grant        none
// ==/UserScript==

setInterval(function() {
                  window.location.reload();
                }, 170000); 

$(document).ready(function(){
    var coinsclicker = setInterval(function() {
        ClickNext();
        ClickOnBubble();
    }, 1);

    window.ClickNext = function(){
        if ($(".sweet-alert.showSweetAlert.visible").length > 0) {
            console.log("clicked");
            $(".confirm").click();
        }
    };
    window.ClickOnBubble = function(){
        if ($(".sweet-alert.hideSweetAlert").length > 0) {
            console.log("clicked");
            $(".confirm").click();
        }
    };
});


(function() {
    'use strict';
    var elements = ['.adsbygoogle', '.adsbygoogle', '.adsbygoogle', '.adsbygoogle', '.adsbygoogle'];
    for(var i = 0; i < elements.length; i++){
        var addContainer = document.querySelector(elements[i]);
        if(addContainer){
            addContainer.parentNode.removeChild(addContainer);
        }
    }
    document.getElementsByTagName('body')[0].style.padding = 0;
})();


setInterval(click, 70000);

function click()
{
 $("#join-lotto-btn.button.button-desc.button-3d.button-rounded.btn-block.center.fright").click();
}