// ==UserScript==
// @name         FineHacks slither.io v1.0
// @namespace    FineHacks
// @version      1
// @description  Shows FPS, rank, current server IP and more!
// @author       FineHacks
// @match        http://slither.io/*
// @grant        none
// ==/UserScript==

(function(w) {

//Append div
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

//Set leaderboard text
function lb() {
    if (w.lbh) w.lbh.textContent = "Mod by slithere.com";
    else setTimeout(lb, 0);
}

    var iStyle = "color: #FFFF00; font-family: fantasy, 'Helvetica Neue', Helvetica, sans-serif; font-size: 15px; position: fixed; opacity: .75; z-index: 7;",
        iCoord = null,
        iServer = null,
        iFPS = null,
        iTop = null;

    //Append divs
    appendDiv("position", "FineHacks", iStyle + "top: 100px;");
    appendDiv("servIP", "FineHacks", iStyle + "top: 120px;");
    appendDiv("framerate", "FineHacks", iStyle + "top: 140px;");
    appendDiv("topPos", "FineHacks", iStyle + "top: 160px;");

    iCoord = document.getElementById("position");
    iServer = document.getElementById("servIP");
    iFPS = document.getElementById("framerate");
    iTop = document.getElementById("topPos");

    //On key down...
    w.onkeydown = function(e) {
            if (e.keyCode == 16) {
                w.setAcceleration(true);
            }
        };
    //On key up...
    w.onkeyup = function(e) {
            if (e.keyCode == 16) {
                w.setAcceleration(false);
            }
    };

    //Keep updating data
    function dt() {
             if (w.playing) {
                 if (iCoord) iCoord.textContent = "X: " + ~~w.snake.xx + "  Y: " + ~~w.snake.yy;
                 if (iServer) iServer.textContent = "Server IP: " + w.bso.ip;
                 if (iFPS && w.fps && w.lrd_mtm) if (Date.now() - w.lrd_mtm > 1000) iFPS.textContent = "FPS: " + w.fps;
                 if (iTop && rank && snake_count !== 0) iTop.textContent = "Rank: " + rank + " of " + snake_count; else iTop.textContent ="Rank: [waiting for rank]";
             }
        setTimeout(dt, 0);
    }

    dt();
    lb();

})(window);