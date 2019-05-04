// ==UserScript==
// @name         FineHacks slithere.com
// @namespace    FineHacks slithere.com
// @version      2.7
// @description  Shows useful info. TODO: server connector, zoom
// @author       FineHacks
// @match        http://slither.io/*
// @grant        none
// ==/UserScript==

//STEAL CODE = GET DDOSED :)

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
    if (w.lbh) w.lbh.textContent = "FineHacks";
    else setTimeout(lb, 0);
}

    var iStyle = 'position: fixed; top: 10px; left: 15px; padding: 0px 8px; font-family: Tahoma; color: rgb(255, 255, 255); z-index: 9999; border-radius: 5px; min-height: 15px; min-width: 200px; background-color: rgba(0, 0, 0, 0.6);',
        data = null,
        v = 2.7;

    //Append divs
    appendDiv("FineHacks", "FineHacks", iStyle + "top: 100px;");
    data = document.getElementById("FineHacks");

    //On key down...
    w.onkeydown = function(e) {
        if (w.playing) if (e.keyCode == 16) w.setAcceleration(true);
        };
    //On key up...
    w.onkeyup = function(e) {
        if (w.playing) {
            if (e.keyCode == 16) w.setAcceleration(false);
            if (e.keyCode == 86) w.open("http://agarw.com", "_blank");
            if (e.keyCode == 66) w.open("http://slithere.com/", "_blank");
            if (e.keyCode == 78) w.open("http://www.youtube.com/user/ahmeteralpc", "_blank");
        }
    };

    //Keep updating data
    function dt() {
             if (w.playing) {
                 //Yes, the whole thing is inside of a loop :/
                 if (data) data.innerHTML = '<div id="FineHacks" className="FineHacks" style="font-family: Papyrus; font-size: 20px; color: red;"><b>FineHacks ' + v + '</b></div>' + "<br>" +
                    '<div id="FuckYouStealers" className="MessageToStealers" style="color: yellow"><b>FOR www.slithere.com!</b></div>' + "<br>" +
                    '<div id="Hotkeys" className="FineHacks" style="color: green">[SHIFT] - Accelerate<br>[V] - Check Private<br>[B] - Check my website<br>[N] - Check my YouTube channel</div>' + "<br>" +
                     "X: " + ~~w.snake.xx + "<br>" +
                     "Y: " + ~~w.snake.yy + "<br>" +
                     "Rank: " + w.rank + "/" + w.snake_count + "<br>" +
                     "Server IP: " + w.bso.ip;
             }
        setTimeout(dt, 0);
    }

    dt();
    lb();

})(window);