// ==UserScript==
// @name         Agma.io Respawn on R - Jolyano
// @namespace    http://tampermonkey.net
// @version      0.1.4
// @description  Click R to respawn
// @author       Jolyano
// @match        http://agma.io/*
// ==/UserScript==
/* jshint ignore:start */
var key = 82;

window.onload = function() {
    var respawn = document.getElementsByClassName("rspwnBtn")[0];
    var play = document.getElementById("playBtn");
    window.onkeydown = function(e) {
        if (e.keyCode == key && document.activeElement == document.body) {
            rspwn(document.getElementById('nick').value);
            play.click();
        }
    }
}
/* jshint ignore:end */