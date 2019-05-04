"use strict";

// ==UserScript==
// @name         SLITHERE.COM Vertix.io Aimbot with C KEY
// @description  AUTO AIM TO ENEMIES WITH PRESSING C KEY
// @match        http://vertix.io
// @match        http://www.vertix.io
// @version      1.1
// @namespace    SLITHERE.COM
// ==/UserScript==

var aktif = false;
var interval = void 0;


// ==UserScript==
// @name         Vertix Script
// @namespace    http://vertix.io/*
// @version      0.2
// @description  A script created by /u/ReelablePenny14
// @author       /u/ReelablePenny14
// @match        http://vertix.io/*
// @grant        GM_addStyle
 
'use strict';
 
GM_addStyle(`
    #mainTitleText {
        width: 100%;
        color: #1EB656;
        font-size: 100px;
        text-align: center;
        text-shadow: 0 1px 0 #ff0000, 0 2px 0 #ff3300, 0 3px 0 #ffff00, 0 4px 0 #726767, 0 5px 0 #009900;
        -webkit-animation: rainbow 4s linear infinite;
        -moz-animation: rainbow 4s linear infinite;
        animation: rainbow 4s linear infinite;
    }
`);
 
GM_addStyle(`
    @keyframes rainbow {
        0% { color: red; }
        14% { color: orange; }
        28% { color: yellow; }
        42% { color: green; }
        56% { color: blue; }
        70% { color: #4B0082; }
        84% { color: purple; }
    }
`);
 
GM_addStyle(`
    @-webkit-keyframes rainbow  {
        0% { color: red; }
        14% { color: orange; }
        28% { color: yellow; }
        52% { color: green; }
        46% { color: blue; }
        70% { color: #4B0082; }
        84% { color: purple; }
    }
`);
 
// ==/UserScript==

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function() {
    document.title = "Penny.io";
    
    var title = document.getElementById('mainTitleText');
    title.innerHTML = 'Nigger lol';
    
    var startButton = document.getElementById('startButton');
    startButton.innerHTML = 'Fuck off';
    var leaderButton = document.getElementById('leaderButton');
    leaderButton.innerHTML = 'Dumb Fags';
    var settingsButton = document.getElementById('settingsButton');
    settingsButton.innerHTML = 'kUNTS ';
    var instructionButton = document.getElementById('instructionButton');
    instructionButton.innerHTML = 'flly';

    var other = document.getElementsByClassName('menuHeader');
    other[0].innerHTML = 'Free tech suport';
    
    })();function getMyPlayer(gameObjects) {

  return gameObjects.filter(function (o) {
    return o.name === player.name;
  })[0];
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getClosestPlayer(gameObjects) {
  var myTeam = getMyPlayer(gameObjects).team;
  var otherPlayers = getOtherPlayers(gameObjects, myTeam);
  var closestDistance = Infinity;
  var closestPlayer = void 0;
  otherPlayers.forEach(function (p) {
    var d = distance(player.x, player.y, p.x, p.y);
    if (d < closestDistance) {
      closestPlayer = p;
      closestDistance = d;
    }
  });
  return closestPlayer;
}

function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y1 - y2, x1 - x2);
}

function setTarget(angle, distance) {
  target.f = angle;
  target.d = distance;
}

function aimClosestPlayer() {
  var closestPlayer = getClosestPlayer(gameObjects);
  if (!closestPlayer) {
    return;
  }
  var angle = getAngle(player.x, player.y, closestPlayer.x, closestPlayer.y);
  var distance = 100;
  setTarget(angle, distance);
  targetChanged = true;
}

function activate(event) {
  event.preventDefault();
  if (event.keyCode === 67 && !aktif) {
    c.removeEventListener("mousemove", gameInput, false);
    aktif = true;
    interval = setInterval(aimClosestPlayer, 10);
  }
}

function deactivate(event) {
  event.preventDefault();
  if (event.keyCode === 67) {
    aktif = false;
    clearInterval(interval);
    c.addEventListener("mousemove", gameInput, false);
  }
}

c.addEventListener("keydown", activate, false);
c.addEventListener("keyup", deactivate, false);

function getOtherPlayers(gameObjects, myTeam) {
  return gameObjects.filter(function (o) {
    return o.type === 'player' && o.dead === false && o.name !== player.name && o.team !== myTeam;
  });
}