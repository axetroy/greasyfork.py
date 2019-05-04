// ==UserScript==
// @name         Picarto Stream Window Killer
// @namespace    https://floof.me/
// @version      1.1
// @description  Allows you to kill streamers in multistreams
// @author       Yoshitura
// @match        https://picarto.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var killer_players = document.getElementsByClassName('centerFixed playerBackdrop flexPlayerInner');
    var killer_num = killer_players.length;
    if(killer_num>1){
        for(var i=0;i<killer_players.length; i++){
            killer_players[i].style="position:relative";
            var close_button = document.createElement('div');
            close_button.innerHTML = "X";
            close_button.setAttribute('style','z-index:100;position:absolute;right:0;top:0;text-align:right;cursor:pointer;user-select:none;');
            close_button.setAttribute('class','killer_player');
            close_button.onclick = function(e){
                e.target.parentElement.parentElement.removeChild(e.target.parentElement);
                killer_num--;
                if(killer_num<2){
                    var buttons = document.getElementsByClassName('killer_player');
                    for(var b=0;b<buttons.length;b++){
                        buttons[b].style='display:none';
                    }
                }
            };
            killer_players[i].appendChild(close_button);
        }
    }
})();