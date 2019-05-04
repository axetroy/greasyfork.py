// ==UserScript==
// @name         eBonus.gg for all (LOL, Fornite, overwatch, etc..)
// @namespace    Mr. Funny Guy
// @version      2.7
// @description  This is just click helper to verify if the videos are playing and getting coins correctly.
// @author       Mr. Funny Guy (Watch Dailymotion: https://www.dailymotion.com/funvideoclips )
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
    }, 5000);

    window.ClickNext = function(){
        if ($(".sweet-alert.showSweetAlert.visible").length > 0) {
            console.log("clicked");
            $(".confirm").click();
        }
    };
    window.ClickOnBubble = function(){
        if ($(".coins_popup.circle").length > 0) {
            console.log("clicked");
            $(".confirm").click();
        }
    };
});

setInterval(click, 70000);