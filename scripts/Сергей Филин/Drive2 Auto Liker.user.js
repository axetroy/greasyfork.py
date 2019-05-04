// ==UserScript==
// @name         Drive2 Auto Liker
// @namespace    drive2.ru
// @version      0.2
// @description  Жму "Нравится" всем подряд.
// @author       philins
// @match        https://www.drive2.ru/*
// @grant        none
// ==/UserScript==

var nIntervId;

nIntervId = setInterval(autoClick,100);

function autoClick(){
    var flag = true;
    var buttons = document.getElementsByClassName("c-like__button");
    for(var i = 0; i < buttons.length; i++){
        if (noClass(buttons[i]," is-off ") && noClass(buttons[i]," c-button--s ")) {
            buttons[i].click();
            flag = false;
        }
    }
    if (flag) {
        clearInterval(nIntervId);
        setTimeout(clickNext, 3000);
    }
}

function clickNext(){
    var nextbutton = document.getElementsByClassName("c-pager__link");
    if(nextbutton.length > 0){
        var nextClicked = false;
        for(var j = 0; j < nextbutton.length; j++){
            if (nextbutton[j].getAttribute('rel')=="next") {
                nextbutton[j].click();
                nextClicked = true;
            }
        }
        if(!nextClicked){
            for(var k = 0; k < nextbutton.length; k++){
                if (nextbutton[k].getAttribute('rel')=="start") {
                    nextbutton[k].click();
                }
            }
        }
    }
}

function noClass(e,c){
    var className = " "+ c +" ";
        if ((" " + e.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(c) < 0) {
            return true;
        }
}