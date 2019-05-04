// ==UserScript==
// @name         WoT_LeaderBot
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Get Rekt
// @author       95504525
// @icon https://greasyfork.org/system/screenshots/screenshots/000/007/132/original/300x300.png
// @match        https://wot-leader.ru/*
// @grant        none
// ==/UserScript==

(function() {
    window.onload = function(){
        var TIMERINTERVAL = 30 * 1000; // ПЕРИОД ПРОВЕРКИ НА МОНЕТКИ (в милисекундах) !!!!!!!!!!!!!!!
        var clicks = 0;
        var txt = document.createElement("TEXT");
        var t = document.createTextNode("Time of last click: 00:00:00 \nClicks: "+String(clicks));
        txt.id = "infoText";
        txt.appendChild(t);
        document.getElementsByClassName("header")[0].appendChild(txt);
        var timerId = setInterval(function() {
            var d = new Date();
            var elcol = document.getElementsByClassName("coin");
            for(var i = 0; i < elcol.length; i++)
            {
                clicks++;
                document.getElementById("infoText").innerText = "Time of last click: "+ d.getHours() +":"+ d.getMinutes() +":" +d.getSeconds() +"\nClicks: "+String(clicks);
                elcol[i].click();
            }
        }, TIMERINTERVAL);
    };
})();