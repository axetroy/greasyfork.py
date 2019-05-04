// ==UserScript==
// @name         Vertix.io Map Radar
// @namespace    http://vertix.io/
// @version      1.1
// @description  Hope you like this radar :) *NOTE* It's not a full minimap radar
// @author       Mystic -
// @match        http://vertix.io/
// @grant        none
// @icon         https://i.imgur.com/gbvZgyE.png
// ==/UserScript==

// Change mini-map size.
document.getElementById('map').style.width  = '250px';
document.getElementById('map').style.height = '250px';

window.drawMiniMap = function () {
    mapCanvas.width = mapCanvas.width, mapContext.globalAlpha = 1;
    for (var a = 0; a < gameObjects.length; ++a) {
        'player' == gameObjects[a].type &&
        gameObjects[a].onScreen &&
        (gameObjects[a].index == player.index ||
         gameObjects[a].team !== player.team ||
         gameObjects[a].team == player.team ||
         gameObjects[a].isBoss) &&
        (mapContext.fillStyle = gameObjects[a].index == player.index ? '#fff' : gameObjects[a].isBoss ? '#db4fcd' : gameObjects[a].team !== player.team ? '#d20d12' : '#5151d9',
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