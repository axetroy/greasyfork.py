// ==UserScript==
// @name        Malones Auto Hyper
// @namespace   MikeyMalone
// @include     https://konduit.live/*
// @version     1
// @grant       none
// @description This is an auto-hype script for http://konduit.live . It will automatically click the hype button randomly between 15-30 seconds. It will hype any time you are in a room.
// ==/UserScript==


console.log("Mixify Auto-Hype Running at " + window.location.href);

function getRandomInt () {
    return Math.floor ((Math.random () * 15000 ) +15000);
}

function clickHype() {
    $('#hype') .click();
	setTimeout(clickHype, getRandomInt());
    }
	

setTimeout(clickHype, getRandomInt());	