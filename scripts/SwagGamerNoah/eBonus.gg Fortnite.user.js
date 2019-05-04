// ==UserScript==
// @name         eBonus.gg Fortnite
// @namespace    SwagGamerNoah
// @version      1.3
// @description  New Ebonus script for fortnite videos
// @author       SwagGamerNoah
// @match        https://ebonus.gg/earn-coins/watch/fortnite
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