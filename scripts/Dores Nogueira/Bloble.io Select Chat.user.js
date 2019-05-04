// ==UserScript==
// @name         Bloble.io Select Chat
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  bloble
// @author       ITALIA
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==
window.addEventListener("keyup", function(a) {
    a = a.keyCode ? a.keyCode : a.which;

    if (a === 81) { // All troops except commander
        selUnits = [];
        units.forEach((unit) => {
            if (unit.owner === player.sid && unit.type === 1) {
                if (!unit.info) unit.info = getUnitFromPath(unit.uPath);
                unit.info.name !== 'Commander' && selUnits.push(unit)

            }
        });
        selUnitType = "Unit";
    } else if (a === 69) { // Everything
        selUnits = [];
        units.forEach((unit) => {
            if (unit.owner === player.sid && unit.type === 1) {
                if (!unit.info) unit.info = getUnitFromPath(unit.uPath);
                selUnits.push(unit)
            }
        });
        selUnitType = "Unit";
    } else if (a === 67) { // Commander
        selUnits = [];
        units.every((unit) => {
            if (unit.owner === player.sid && unit.type === 1) {
                if (!unit.info) unit.info = getUnitFromPath(unit.uPath);
                if (unit.info.name === 'Commander') {
                    selUnits.push(unit)
                    return false;
                }
            }
            return true;
        });
        selUnitType = "Unit";
    }
});