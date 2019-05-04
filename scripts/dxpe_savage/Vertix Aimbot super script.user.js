// ==UserScript==
// @name         Vertix Aimbot super script
// @namespace    http://vertix.io/
// @version      1.63
// @description  Radar Auto Jump ('Z' =on ') Aimbot ('shift' =on , 'A =off') Show's Camos Right click Secondary (buffed) Accurate Aim Cursor
// @author       Dxpe_Savage
// @match        http://vertix.io/
// @grant        none
// ==/UserScript==

//Shorten Weapon Length//

function wepLength() {
    setTimeout(wepLength, 1);
    if (player.onScreen) {
         setTimeout(player.weapons["0"].length = 5000,100);
    player.weapons["0"].width = 15;
    player.weapons["0"].shake = 0;
    }
}
wepLength();

  //Faster Minimap//

drawMiniMapFPS = 1;
//chat fill//

//Auto jump//
document.addEventListener("keydown", function(a) { // Press 'z' to start auto jump
    if (a.keyCode == 90) {
setTimeout(keys.s = 1,10);
    }
}, false); 

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



//orginal script//
$("#map").css("width","400px");
$("#map").css("height","400px");
$("canvas").css("cursor","url(https://s15.postimg.org/ka093ucbf/Hunter_Vertix_Cursor.png) 17 17, default");

$(document).ready(function() {
    window.drawMiniMap = function() {
        mapCanvas.width = mapCanvas.width, mapContext.globalAlpha = 1;
        for (var a = 0; a < gameObjects.length; ++a)
            "player" == gameObjects[a].type &&
                gameObjects[a].onScreen &&
                (gameObjects[a].index == player.index ||
                 gameObjects[a].team !== player.team ||
                 gameObjects[a].team == player.team ||
                 gameObjects[a].isBoss) &&
                (mapContext.fillStyle = gameObjects[a].index == player.index ? "#fff" : gameObjects[a].isBoss ? "#db4fcd" : gameObjects[a].team !== player.team ? "#d20d12" : "#5151d9",
                 mapContext.beginPath(),
                 mapContext.arc(gameObjects[a].x / gameWidth * mapScale, gameObjects[a].y / gameHeight * mapScale, pingScale, 0, 2 * mathPI, !0),
                 mapContext.closePath(),
                 mapContext.fill());
        if (null != gameMap) {
            for (mapContext.globalAlpha = 1, a = 0; a < gameMap.pickups.length; ++a)
                gameMap.pickups[a].active &&
                    ("lootcrate" == gameMap.pickups[a].type ? mapContext.fillStyle = "#ffd100" : "healthpack" == gameMap.pickups[a].type &&
                     (mapContext.fillStyle = "#5ed951"),
                     mapContext.beginPath(),
                     mapContext.arc(gameMap.pickups[a].x / gameWidth * mapScale, gameMap.pickups[a].y / gameHeight * mapScale, pingScale, 0, 2 * mathPI, !0),
                     mapContext.closePath(),
                     mapContext.fill());
            mapContext.globalAlpha = 1.0,
                a = getCachedMiniMap(),
                null != a &&
                mapContext.drawImage(a, 0, 0, mapScale, mapScale),
                delete a
        }
    }
});

$("#cvs").mousedown(function(ev){
      if(ev.which == 3)
      {
  playerSwapWeapon(player, 1);
 setTimeout(shootBullet(player), 1);
playerSwapWeapon(player, 1);
      }
});

var WeaponNames = ["Machine Gun","Desert Eagle","Sniper","Grenade Launcher","Rocket Launcher","Machine Pistol","Minigun","Flamethrower"];

var b=0;
document.getElementById("charWpn").addEventListener("click",function bzero() {b=0;}, false);
document.getElementById("charWpn2").addEventListener("click",function bone() {b=1;}, false);
document.getElementById("camoList").addEventListener("click",ShowCurrentWeapon, false);     

function ShowCurrentWeapon() {
        var a = characterClasses[currentClassID].weaponIndexes[b]; /* get the weapon id */
        var x=0;
        while(camoDataList[a][x].id != getCookie("wpnSkn"+a)) { /* find the proper id of the camo */
            x=x+1;
        }
        if(b===0) { characterWepnDisplay.innerHTML = "<b>Primary:</b><div class='hatSelectItem' style='display:inline-block; color:" + getItemRarityColor(camoDataList[a][x].chance) + ";'>" + camoDataList[a][x].name + " x" + (parseInt(camoDataList[a][x].count) + 1) + "<div class='hoverTooltip'><div style='float:left; margin-top:10px; margin-right:10px; width:62px; height:62px; background:url(" + getCamoURL(camoDataList[a][x].id) + "); background-size:cover; background-repeat:no-repeat; background-position:50% 50%;'></div><div style='color:" + getItemRarityColor(camoDataList[a][x].chance) + "; font-size:16px; margin-top:5px;'>" + camoDataList[a][x].name + "</div><div style='color:#ffd100; font-size:12px; margin-top:0px;'>droprate " + camoDataList[a][x].chance + "%</div><div style='font-size:8px; color:#d8d8d8; margin-top:1px;'><i>weapon camo</i></div><div style='font-size:12px; margin-top:5px;'>" + WeaponNames[a] + " weapon skin.</div><div style='font-size:8px; color:#d8d8d8; margin-top:5px;'><i></i></div></div></div>"; }
        else { characterWepnDisplay2.innerHTML = "<b>Secondary:</b><div class='hatSelectItem' style='display:inline-block; color:" + getItemRarityColor(camoDataList[a][x].chance) + ";'>" + camoDataList[a][x].name + " x" + (parseInt(camoDataList[a][x].count) + 1) + "<div class='hoverTooltip'><div style='float:left; margin-top:10px; margin-right:10px; width:62px; height:62px; background:url(" + getCamoURL(camoDataList[a][x].id) + "); background-size:cover; background-repeat:no-repeat; background-position:50% 50%;'></div><div style='color:" + getItemRarityColor(camoDataList[a][x].chance) + "; font-size:16px; margin-top:5px;'>" + camoDataList[a][x].name + "</div><div style='color:#ffd100; font-size:12px; margin-top:0px;'>droprate " + camoDataList[a][x].chance + "%</div><div style='font-size:8px; color:#d8d8d8; margin-top:1px;'><i>weapon camo</i></div><div style='font-size:12px; margin-top:5px;'>" + WeaponNames[a] + " weapon skin.</div><div style='font-size:8px; color:#d8d8d8; margin-top:5px;'><i></i></div></div></div>"; }

}
$("#cvs").mousedown(function(ev){
      if(ev.which == 3)
      {
  playerSwapWeapon(player, 1);
 setTimeout(shootBullet(player), 1);
playerSwapWeapon(player, 1);
      }
});
$("#cvs").mousedown(function(ev){
      if(ev.which == 3)
      {
  playerSwapWeapon(player, 1);
 setTimeout(shootBullet(player), 1);
playerSwapWeapon(player, 1);
      }
});
$("#cvs").mousedown(function(ev){
      if(ev.which == 3)
      {
  playerSwapWeapon(player, 1);
 setTimeout(shootBullet(player), 1);
playerSwapWeapon(player, 1);
      }
});
$("#cvs").mousedown(function(ev){
      if(ev.which == 3)
      {
  playerSwapWeapon(player, 1);
 setTimeout(shootBullet(player), 1);
playerSwapWeapon(player, 1);
      }
});

document.getElementById("cvs").onkeydown=function(a){var b=a.keyCode?a.keyCode:a.which;9==b&&(maxScreenHeight=3000,maxScreenWidth=3000,resize());var b=a.keyCode?a.keyCode:a.which;192==b&&(maxScreenHeight-=1e3,maxScreenWidth-=1e3,resize())};