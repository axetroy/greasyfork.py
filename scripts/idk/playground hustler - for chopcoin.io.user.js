// ==UserScript==
// @name        playground hustler - for chopcoin.io
// @namespace   namespace
// @description creates an alert box when someone enters a paid room, so you can do something else while waiting for other players
// @include     http://chopcoin.io/*
// @version     1.03
// @grant       none
// ==/UserScript==


var playOnce = true;
checkPlayers();

function checkPlayers() {
    var players = chopcoin.game.leaderboard.list.length;
    var pot = chopcoin.game.pot;
    if (players > 1 && playOnce && pot != 0) {
        alert('multiple players');
        playOnce = false;
        console.log('multiple players');
    }
    else if(players == 1) {
        playOnce = true;
        console.log('player reset');
    }
    setTimeout(function(){ checkPlayers(); }, 1000);
}

