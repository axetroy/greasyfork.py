// ==UserScript==
// @name         SLITio by NatKunG TH
// @namespace    NatKunG TH
// @version      0.1.3
// @description  slither.io MOD
// @author       szymy
// @match        http://slither.io/*
// @grant        none
// ==/UserScript==

(function(w) {
    var gameFPS = null,
        positionHUD = null,
        fpsHUD = null,
        styleHUD = "color: #FFF; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; position: fixed; opacity: 0.35; z-index: 100;",
        clearedBg = false,
        clearedGlow = false;
    function init() {
        // Append DIVs
        appendDiv("position-hud", "nsi", styleHUD + "right: 30; bottom: 120px;");
        appendDiv("fps-hud", "nsi", styleHUD + "right: 30; bottom: 140px;");
        positionHUD = document.getElementById("position-hud");
        fpsHUD = document.getElementById("fps-hud");
        // Add zoom
        if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener("DOMMouseScroll", zoom, false);
        } else {
            document.body.onmousewheel = zoom;
        }
        // Hijack console log
        window.console.log = grabLog;
        // Set game
        w.high_quality = false;
        w.gla = 0;
        // Clear background and glow
        clearBg();
        // Update game
        updateGame();
    }
    // Append DIV
    function appendDiv(id, className, style) {
        var div = document.createElement("div");
        if (id) {
            div.id = id;
        }
        if (className) {
            div.className = className;
        }
        if (style) {
            div.style = style;
        }
        document.body.appendChild(div);
    }
    // Zoom
    function zoom(e) {
        w.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail || 0);
    }
    // Grab console log
    function grabLog(msg) {
        if (msg.indexOf("FPS") != -1) {
            gameFPS = msg;
        }
    }
    // Clear background and glow
    function clearBg() {
        if (clearedBg && clearedGlow) {
            return;
        }
        w.ggbg = false;
        if (w.ii && !clearedBg) {
            w.ii.src = "";
            w.ii.onload = null;
            w.ii = null;
            if (w.bgi2) {
                w.bgi2 = null;
            }
            clearedBg = true;
        }
        if (w.gbgi && !clearedGlow) {
            w.gbgi.src = "";
            w.gbgi.onload = null;
            w.gbgi = null;
            if (w.gbgmc) {
                w.gbgmc = null;
            }
            clearedGlow = true;
        }
        setTimeout(clearBg, 50);
    }
    // Update game
    function updateGame() {
        if (positionHUD) {
            positionHUD.innerHTML = "X: " + ~~w.view_xx + " Y: " + ~~w.view_yy;
        }
        if (fpsHUD && gameFPS) {
            fpsHUD.innerHTML = gameFPS;
        }
        if (w.high_quality) {
            w.high_quality = false;
            w.gla = 0;
        }
        setTimeout(updateGame, 500);
    }
    // Init
    init();
})(window);
