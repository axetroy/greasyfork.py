// ==UserScript==
// @name         slithere.com finehacks v3.1
// @namespace    slithere
// @version      3.1
// @description  here you are i reedemed codes nothing changed lol
// @author       Slithere.com
// @match        http://slither.io/*
// @grant        none
// ==/UserScript==

//STEAL CODE = GET MY D*CK not DDOS :)

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
    if (w.lbh) w.lbh.textContent = "Slithere.com";
    else setTimeout(lb, 0);
}

//szymy's zoom func
function zoom(e) {
        if (!w.gsc) {
            return;
        }
        w.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
}

    var iStyle = 'position: fixed; top: 10px; left: 15px; padding: 0px 8px; font-family: Tahoma; color: rgb(255, 255, 255); z-index: 9999; border-radius: 5px; min-height: 15px; min-width: 200px; background-color: rgba(0, 0, 0, 0.6);',
        data = null,
        v = 3.1;

    //Append divs
    appendDiv("Slithere", "Slithere", iStyle + "top: 100px;");
    data = document.getElementById("Slithere");

    //On key down...
    w.onkeydown = function(e) {
        if (w.playing) if (e.keyCode == 16) w.setAcceleration(true);
        };

    //On key up...
    w.onkeyup = function(e) {
        if (w.playing) {
            if (e.keyCode == 16) w.setAcceleration(false);
            if (e.keyCode == 86) w.open("https://agarw.com", "_blank");
            if (e.keyCode == 66) w.open("http://slithere.com/", "_blank");
            if (e.keyCode == 78) w.open("http://www.youtube.com/user/ahmeteralpc", "_blank");
        }
    };

    //szymy's zoom
    if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener("DOMMouseScroll", zoom, false);
        } else {
            document.body.onmousewheel = zoom;
        }

    //Keep updating data
    function dt() {
             if (w.playing) {
                 //Yes, the whole thing is inside of a loop :/
                 if (data) data.innerHTML = '<div id="Slithere" className="Slithere" style="font-family: Papyrus; font-size: 20px; color: red;"><b>Slithere ' + v + '</b></div>' + "<br>" +
                    '<div id="FuckYouStealers" className="MessageToStealers" style="color: yellow;"><b>www.AgarW.com</b></div>' + "<br>" +
                    '<div id="slitherio" className="Slithere" style="color: bisque; font-size: 17px"><sup><b>[Special for slithere.com]</b></sup></div>' + "<br>" +
                    '<div id="Hotkeys" className="Slithere" style="color: green;">[SHIFT] - Accelerate<br>[V] - Check private<br>[B] - Check my website<br>[N] - Check my YouTube channel<br>[Mouse wheel] - Zoom</div>' + "<br>" +
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