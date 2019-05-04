// ==UserScript==
// @name         Vertix.io Aimbot | Right Click Secondary | Shoot All Bullets | JumpShoot
// @description  Press Shift for Aimbot, Right click to use Secondary, Click scroll wheel or Q to fire all Bullets, press space to Jumpshot
// @match        http://vertix.io
// @match        http://www.vertix.io
// @version      1.0
// @Author       TurtleKing
// @namespace https://greasyfork.org/en/users/192146
// ==/UserScript==

// credits to Scriptzxxx, Meatman2tasty, and Lightningking

// Aimbot
var active = false;
var interval = void 0;

function activate(event) {
    event.preventDefault();
    if (event.keyCode === 16 && !active) {
        c.removeEventListener("mousemove", gameInput, false);
        active = true;
        interval = setInterval(aimClosestPlayer, 10);
    }
}

function deactivate(event) {
    event.preventDefault();
    if (event.keyCode === 16) {
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

// Right Click Secondary
c.addEventListener('mousedown', function (event) { // Shoots secondary on down.
    if (event.which == 3) {
        playerSwapWeapon(player, 1);
        setTimeout(shootBullet(player), 1);
    }
});
c.addEventListener('mouseup', function (event) {
    if (event.which == 3) {
        setTimeout(playerSwapWeapon(player, 1), 1);
    }
});

// Shoot All Bullets
c.addEventListener('mousedown', function (event) {
    if (event.which == 2) {
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
    }
});

document.addEventListener("keydown", function(a) {
    if (a.keyCode == 81) {
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
        shootBullet(player);
    }
}, false);

// Jumpshoot
$("#cvs").keydown(function(space){32==space.which&&shootBullet(player)});