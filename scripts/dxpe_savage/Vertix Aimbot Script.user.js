// ==UserScript==
// @name         Vertix Aimbot Script
// @namespace    http://vertix.io/
// @version      1.63
// @description  Aimbot ('Shift' =on 't' =off) Enemy Radar
// @author       dxpe_savage
// @grant        none
// ==/UserScript==

//Aimbot addition//
var active = false;
var interval = void 0;

function activate(event) { //'shift' to activate
    event.preventDefault();
    if (event.keyCode === 16 && !active) {
        c.removeEventListener("mousemove", gameInput, false);
        active = true;
        interval = setInterval(aimClosestPlayer, 10);
    }
}

function deactivate(event) { //'t' to deactivate
    event.preventDefault();
    if (event.keyCode === 84) {
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
//Faster Minimap//

drawMiniMapFPS = 1;
//chat fill//
//Shorten Weapon Length//

function wepLength() {
    setTimeout(wepLength, 1);
    if (player.onScreen) {
         setTimeout(player.weapons["0"].length = 50,100);
    player.weapons["0"].width = 15;
    player.weapons["0"].shake = 0;