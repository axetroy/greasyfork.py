// ==UserScript==
// @name         Vertex.io Aimbot!
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  CTRL for aimbot.
// @author       100taps
// @match        vertix.io/*
// @match        http://www.vertix.io/*
//remember to dab
// @grant        vertix.io/*
// @icon              https://i.imgur.com/QXr35MB.png
// ==/UserScript==

drawMiniMapFPS = 1;

// stuff(1)
document.getElementById("mainTitleText").style.color = "#191970";
var doc1 = document.createElement("p");
var node = document.createTextNode("VertexAimbot");
doc1.appendChild(node);
var element = document.getElementById("mainTitleText");
element.appendChild(doc1);

// stuff(2)
var para2 = document.createElement("p");
var node2 = document.createTextNode("By 100taps");
para2.appendChild(node2);
var element2 = document.getElementById("mainTitleText");
element2.appendChild(para2);


var active = false;
var interval = void 0;

function activate(event) {
  event.preventDefault();
  if (event.keyCode === 17 && !active) {
    c.removeEventListener("mousemove", gameInput, false);
    active = true;
    interval = setInterval(aimClosestPlayer, 20);
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
  var distance = 70;
  setTarget(angle, distance);
  targetChanged = true;
}

window.onkeydown = function(event) {
   if (event.keyCode === 72) {
      alert("CTRL To turn on aimbot");
      console.log('-=----------------=-');
      console.log('Name: ' + player.name);
      console.log('Team: ' + player.team);
      console.log('Dead: ' + player.dead);
      console.log('Boss: ' + player.isBoss);
      console.log('Health: ' + player.health);
      console.log('Kills: ' + player.kills);
      console.log('Deaths: ' + player.deaths);
      console.log('-=----------------=-');
   }
};

// Radar (Credits to Lightning King)
window.drawMiniMap = function () {
    mapCanvas.width = mapCanvas.width, mapContext.globalAlpha = 1;
    for (var a = 0; a < gameObjects.length; ++a) {
        'player' == gameObjects[a].type &&
        gameObjects[a].onScreen &&
        (gameObjects[a].index == player.index ||
         gameObjects[a].team !== player.team ||
         gameObjects[a].team == player.team ||
         gameObjects[a].isBoss) &&
        (mapContext.fillStyle = gameObjects[a].index == player.index ? '#fff' : gameObjects[a].isBoss ? '#db4fcd' : gameObjects[a].team !== player.team ? '#D35400' : '#5151d9',
            mapContext.beginPath(),
            mapContext.arc(gameObjects[a].x / gameWidth * mapScale, gameObjects[a].y / gameHeight * mapScale, pingScale, 0, 2 * mathPI, !0),
            mapContext.closePath(),
            mapContext.fill());
    }
    if (null != gameMap) {
        for (mapContext.globalAlpha = 1, a = 0; a < gameMap.pickups.length; ++a) {
            gameMap.pickups[a].active &&
            ('lootcrate' == gameMap.pickups[a].type ? mapContext.fillStyle = '#ffd100' : 'healthpack' == gameMap.pickups[a].type &&
            (mapContext.fillStyle = '#5ed951'),
                mapContext.beginPath(),
                mapContext.arc(gameMap.pickups[a].x / gameWidth * mapScale, gameMap.pickups[a].y / gameHeight * mapScale, pingScale, 0, 2 * mathPI, !0),
                mapContext.closePath(),
                mapContext.fill());
        }
        mapContext.globalAlpha = 1.0,
            a = getCachedMiniMap(),
        null != a &&
        mapContext.drawImage(a, 0, 0, mapScale, mapScale),
            delete a;
    }
};