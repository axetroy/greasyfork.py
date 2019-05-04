// ==UserScript==
// @name         Battlepoint Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto-Pickup
// @author       SnowOfficial / SnowLord7 / Drew Snow
// @match        https://battlepoint.io/
// @grant        none
// ==/UserScript==

setInterval(function() {
    if (typeof UI !== "undefined") {
        UI.gameStatesUIController.gameState.ENTITIES.items.children.forEach(function(e) {
            if (e.constructor.toString().slice(9, 19) == "Pickupable") {
                if ("wxyzgdf".indexOf(e.type) != -1) {
                    UI.gameStatesUIController.gameState.networkCommunicator.sendItemPickup(e.id);
                }
            }
        });
    }
}, 10);