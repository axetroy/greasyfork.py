// ==UserScript==
// @name        FAResizeFitScreen
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Add a button to have a full view resized to screen.
// @author       MissNook
// @match        https://www.furaffinity.net/view/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var divActions = document.getElementsByClassName("alt1 actions")[0];

    function createButton(func){

        var button = document.createElement("b");
        var link = document.createElement("a");
        link.onclick = func;
        link.style = "margin:0 5px 0 0";
        link.innerHTML = "| Full view resized to screen";
        button.appendChild(link);

        var prevButton = divActions.getElementsByClassName("prev");
        if(prevButton.length > 0){
            divActions.insertBefore(button, prevButton[0]);
        }
        else {
            divActions.appendChild(button);
        }
    }
    createButton(resizeToFitScreen);

    function resizeToFitScreen (){
        var img = document.getElementById("submissionImg");
        img.src = img.getAttribute("data-fullview-src");
        img.style.width = "100%";
    }
})();
