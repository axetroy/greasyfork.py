// ==UserScript==
// @name         Bloble.io NoobScript V3 TroopJoin Fragment
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A fragment of code from NoobScript V3 - The troop joiner. Troops are automatically joined into one
// @author       NoobishHacker
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

function moveSelUnits() {
    if (selUnits.length) {
        var a = player.x + targetDst * MathCOS(targetDir) + camX,
            d = player.y + targetDst * MathSIN(targetDir) + camY;
        for (var e = [], b = 0; b < selUnits.length; ++b) e.push(selUnits[b].id);
        socket.emit("5", UTILS.roundToTwo(a), UTILS.roundToTwo(d), e, 0, -1)
    }
}