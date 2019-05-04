"use strict";

// ==UserScript==
// @name         ShellShockers Aimbot [Fixed]
// @description  Hey. This is in the making so, idk like don't expect it to work. Make sure you have tampermonkey so that way this works. I fixed this aimbot to make the stuff more cancerus. heres how to use it: Aim at the closest player by pressing Shift, turn it off with left control.
// @match        https://shellshock.io/
// @match        http://www.shellshock.io
// @version      1.5555556
//
// @namespace https://greasyfork.org/en/users/220570-meowffle-cat
// ==/UserScript==

var active = true;
var interval = void 0;
var c=1
var gameInput
var player
var target
var gameObjects
var targetChanged

function activate(event) {
  event.preventDefault();
  if (event.keyCode === 16 ) {
    c.removeEventListener("mousemove", gameInput, false);
    active = true;
    interval = setInterval(aimClosestPlayer, 1);
  }
}

function deactivate(event) {
  event.preventDefault();
  if (event.keyCode === 17) {
    active = false;
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

function getMyPlayer(gameObjects) {
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