// ==UserScript==
// @name         Vertix Aimbot
// @namespace    http://vertix.io/
// @version      1.1.0
// @description  Automatically aims at the closest player (Z to toggle)
// @author       dannytech
// @match        http://vertix.io/
// @grant        none
// ==/UserScript==

// Settings
var interval = 1; // How often to re-aim, in milliseconds
var safeChange = 0.2; // The amount (between 0 and pi) the angle can change per cycle without looking suspicious, change this to 0 to immediately aim (more suspicious looking to other players)
var toggleKey = 49; // The key used to toggle the script on and off, default "1"
var releaseKey = 50; // The key used to release/capture the mouse when no target is selected, default "2"

// Global variables
var releaseMouse = false; // Release the mouse if no target is found
var active = false; // Is the aimbot active
var timer = null;

function setLock() {
    releaseMouse = !releaseMouse;
    window.localStorage.setItem("mouseLocked", releaseMouse);
}

function setMouse(state) {
    if (state) {
        c.addEventListener("mousemove", gameInput, false);
    } else {
        c.removeEventListener("mousemove", gameInput, false); // Disable mouse movement
    }
}

// Turn on/off
function toggle() {
    if (active) {
        clearInterval(timer);
    } else {
        timer = setInterval(aimClosestPlayer, interval); // Update the aim regularly
    }
    setMouse(active);
    active = !active;
    window.localStorage.setItem("aimbotEnabled", active);
}

// Toggles
$(c).keydown(function (e) {
    if (e.which === toggleKey) { // 1
        toggle();
    } else if (e.which === releaseKey) {
        setLock();
    }
});

if(window.localStorage.getItem("aimbotEnabled")) {
    toggle();
}
if(window.localStorage.getItem("mouseLocked")) {
    setLock();
}

function getOtherPlayers(myTeam) {
    return gameObjects.filter(function (o) {
        return o.type === 'player' && o.onScreen === true && o.dead === false && o.id !== player.id && o.team !== myTeam;
    });
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getClosestPlayer() {
    var otherPlayers = getOtherPlayers(player.team);
    var closestDistance = Infinity;
    var closestPlayer = null;
    otherPlayers.forEach(function (p) {
        var d = distance(player.x, player.y, p.x, p.y);
        if (d < closestDistance) {
            closestPlayer = p;
            closestPlayer.distance = closestDistance = d;
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

var currentAngle = null;
function aimClosestPlayer() {
    var closestPlayer = getClosestPlayer();
    if (!closestPlayer) {
        if (releaseMouse) setMouse(true);
        return;
    }
    setMouse(false);
    var angle = getAngle(player.x, player.y, closestPlayer.x, closestPlayer.y);
    if (currentAngle === null) currentAngle = angle;
    var difference = angle - currentAngle;
    if (difference > safeChange) {
        if (difference < 0) {
            currentAngle -= safeChange;
        } else {
            currentAngle += safeChange;
        }
    } else {
        currentAngle = angle;
    }
    setTarget(currentAngle, closestPlayer.distance);
    targetChanged = true;
}
