// ==UserScript==
// @name         Bloble.io NoobScript V3 MoreSkins Fragment
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  A fragment of code from NoobScript V3 - 200+ more skins.
// @author       NoobishHacker
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4)
            callback(xmlHttp.status == 200 ? xmlHttp.responseText : false);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
var customSkins = [];
httpGetAsync("https://andrewprivate.github.io/skins/skinlist", (b) => {
    if (b) {
        b = b.split('\n').filter((l) => {
            return l
        });
        b.forEach((skin, i) => {
            customSkins.push(skin);
        })
    }
})

window.renderPlayer = function(a, d, c, b, g) {
    b.save();
    if (a.skin && 0 < a.skin && a.skin <= playerSkins && !skinSprites[a.skin]) {
        var e = new Image;
        e.onload = function() {
            this.readyToDraw = !0;
            this.onload = null;
            g == currentSkin && changeSkin(0)
        };
        e.src = ".././img/skins/skin_" + (a.skin - 1) + ".png";
        skinSprites[a.skin] = e
    } else if (customSkins.length && a && a.name) {
        if (!a.resolvedSkin) {
            a.resolvedSkin = true;
            if (a.name[0] === ':') {
                var match = a.name.match(/(?:\:([0-9]*))(.*)/);
                if (match[1]) {
                    a.name = match[2].length ? match[2] : "unknown";
                    a.customSkin = parseInt(match[1]);
                }
            }
        }
        if (a.customSkin !== undefined && customSkins[a.customSkin]) {

            var ind = a.customSkin + playerSkins + 1
            if (!skinSprites[ind]) {
                var e = new Image;
                e.onload = function() {
                    this.readyToDraw = !0;
                    this.onload = null;
                }
                e.onerror = function() {
                    this.onerror = null;
                    if (skinSprites[ind] !== false) {
                        setTimeout(function() { // second chance
                            skinSprites[ind] = false;
                        }, 1000)
                    }
                }
                e.src = "https://andrewprivate.github.io/skins/" + customSkins[a.customSkin] + ".png";

                skinSprites[ind] = e
            }
            if (skinSprites[ind].readyToDraw) {
                e = a.size - b.lineWidth / 4
                b.save()
                b.lineWidth /= 2
                renderCircle(d, c, a.size, b, !1, !0)
                b.clip()
                b.drawImage(skinSprites[ind], d - e, c - e, 2 * e, 2 * e)
                b.restore();
                return;
            }
        }

    }
    a.skin && skinSprites[a.skin] && skinSprites[a.skin].readyToDraw ? (e = a.size - b.lineWidth / 4, b.drawImage(skinSprites[a.skin], d - e, c - e, 2 * e, 2 * e), b.lineWidth /= 2, renderCircle(d, c, a.size, b, !1, !0)) : g || (b.fillStyle = playerColors[a.color], renderCircle(d,
        c, a.size, b));
    b.restore()
}