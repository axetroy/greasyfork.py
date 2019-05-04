// ==UserScript==
// @name MOOMOO.IO GOLD CHEAT
// @version 1.3
// @description THIS IS JUST A JOKE ~~ Also, check out this cool cosmetic mod I made: https://greasyfork.org/en/scripts/370253-weaponeffects
// @author Perussi
// @match *://moomoo.io/*
// @match *sandbox.moomoo.io/*
// @grant none
// @namespace https://greasyfork.org/users/128061
// ==/UserScript==

var countr = 0;
var delay = 0;
var rand = Math.round(Math.random()*1500);

function reee(){
  if(1500+rand <= delay){
  countr += Math.max(1, Math.round(countr*1.01))
  document.getElementById("scoreDisplay").innerHTML = countr;
  } else {
    delay += 1;
  }
}

setInterval(reee, 7);