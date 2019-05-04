// ==UserScript==
// @name         eBonus.gg Pro
// @namespace    Daniel Fontenelle
// @version      1.3
// @description  Auto clique no próximo vídeo, clique automático na bolha e recarrega a página automaticamente com vídeos quebrados.
// @author       Daniel Fontenelle (FACEBOOK: https://www.facebook.com/danielll.fontenelle )
// @match        https://ebonus.gg/earn-coins/watch
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
    
});