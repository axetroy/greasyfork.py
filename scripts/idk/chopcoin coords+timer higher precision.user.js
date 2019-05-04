// ==UserScript==
// @name        chopcoin coords+timer higher precision
// @namespace   namespace
// @description change title to show coordinates, and a 30 second timer after space has been pressed, updated by HPrivakos
// @include     http://chopcoin.io/
// @version     1.1
// @grant       none
// ==/UserScript==

var timer = 0;
var xCoord = 0;
var yCoord = 0;


setTitle();
window.addEventListener("keydown", dealWithKeyboard, false);

function setTitle() {
    getCoords();
    document.title = xCoord + " : " + yCoord + " | " + Math.round(timer / 10);
    if (timer != 0) timer--;
    setTimeout(function(){ setTitle(); }, 100);
}

function getCoords() {
    var rawNodes = chopcoin.game.nodes['all'];
    for(var i=0; i<rawNodes.length; i++) {
        if (rawNodes[i]._name) {
            xCoord = Math.round(rawNodes[i].x / 100);
            yCoord = Math.round(rawNodes[i].y / 100);
            //console.log(xCoord + " x " + yCoord);
        }
    }
}

function dealWithKeyboard(e) {
    if (e.keyCode == "32") timer = 300;
}