// ==UserScript==
// @name         by cem slither.io
// @namespace    slither.io
// @version      0.1.4
// @description  slither.io prosuyum :D
// @author       cem
// @match        http://slither.io/*
// @grant        boş
// ==/UserScript==

(function(w) {
    var renderMode = 2, // 2 - normal, 1 - simple (mobile)
        gameFPS = null,
        positionHUD = null,
        fpsHUD = null,
        ipHUD = null,
        styleHUD = "color: #FFF; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; position: fixed; opacity: 0.35; z-index: 100;",
        clearedBg = false,
        clearedGlow = false;
    function init() {
// ==/UserScript==

function updateElem(str) {
  currServ = bso ? bso.ip + ':' + bso.po : 'None';
  topElem.textContent = 'Server: ' + currServ + ', ' + str + ', ' + 'X: ' + (parseInt(ovxx) || 0) + ', Y: ' + (parseInt(ovyy) || 0);
};

function force(elem) {
  var splitArr = elem.value.split(':');
  if (splitArr.length > 1) forceServer((splitArr[0] || ''), (splitArr[1] || ''));
};

var topElem = document.createElement('span');
topElem.style.position = 'fixed';
topElem.style.zIndex = '666';
topElem.style.top = '5px';
topElem.style.left = '666px';
topElem.style.fontSize = '20px';
topElem.style.fontFamily = 'Verdana';
topElem.style.color = '#FFF';
document.body.appendChild(topElem);

var parent = document.getElementById('playh');
var div = document.createElement('div');
var input = document.createElement('input');
var button = document.createElement('span');
var currServ = 'None';

div.style.width = '244px';
div.style.margin = '14px auto';
div.style.background = '#4c447c none repeat scroll 0% 0%';
div.style.boxShadow = '0px 6px 50px rgb(0, 0, 0)';
div.style.border = '2px solid rgba(0, 0, 0, 1)';
div.style.borderRadius = '29px';
div.style.display = 'block';
div.style.padding = '5px';
div.style.fontFamily = 'Verdana';
div.style.position = 'relative';

input.type = 'text';
input.placeholder = 'IP-Address:Port';
input.style.margin = '2px';
input.style.background = 'rgba(0, 0, 0, 0) none repeat scroll 0 0';
input.style.border = '0 none';
input.style.color = '#e0e0ff';
input.style.fontSize = '15px';

button.textContent = 'Go!';
button.style.cursor = 'pointer';
button.style.color = '#FFF';
button.style.borderRadius = '24px';
button.style.margin = '2px';
button.style.padding = '2px 6px';
button.style.background = 'linear-gradient(180deg, #9DA, #485)';
button.onclick = function() { force(input); };

div.appendChild(input);
div.appendChild(button);

parent.appendChild(div);


if(window.console){
  window.console.yo = console.log;
  window.console.log = function(str){
    window.console.yo(str);
    updateElem(str);
  }
}   
        // Append DIVs
        appendDiv("position-hud", "nsi", styleHUD + "right: 30; bottom: 120px;");
        appendDiv("fps-hud", "nsi", styleHUD + "right: 30; bottom: 140px;");
        appendDiv("ip-hud", "nsi", styleHUD + "right: 30; bottom: 8;");
        positionHUD = document.getElementById("position-hud");
        fpsHUD = document.getElementById("fps-hud");
        ipHUD = document.getElementById("ip-hud");
        // Add zoom
        if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener("DOMMouseScroll", zoom, false);
        } else {
            document.body.onmousewheel = zoom;
        }
        // Hijack console log
        if (window.console) {
            window.console.logOld = console.log;
            window.console.log = getConsoleLog;
        }
        // Set game
        setGame();
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
        if (!w.gsc) {
            return;
        }
        w.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail || 0);
    }
    // Get console log
    function getConsoleLog(log) {
        window.console.logOld(log);
        if (log.indexOf("FPS") != -1) {
            gameFPS = log;
        }
    }
    // Set game
    function setGame() {
        if (w.render_mode && w.render_mode != renderMode) {
            w.render_mode = renderMode;
        }
        if (w.high_quality) {
            w.high_quality = false;
        }
        if (w.gla && w.gla != 0) {
            w.gla = 0;
        }
    }
    // Clear background and glow
    function clearBg() {
        if (clearedBg && clearedGlow) {
            return;
        }
        if (w.ii && !clearedBg) {
            w.ii.src = "";
            w.ii.onload = null;
            w.ii = null;
            if (w.bgi2) {
                w.bgi2 = null;
            }
            clearedBg = true;
        }
        if (w.ggbg) {
            w.ggbg = false;
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
            positionHUD.textContent = "X: " + (~~w.view_xx || 0) + " Y: " + (~~w.view_yy || 0);
        }
        if (fpsHUD && gameFPS) {
            fpsHUD.textContent = gameFPS;
        }
        if (ipHUD && w.bso) {
            ipHUD.textContent = "IP: " + w.bso.ip + ":" + w.bso.po;
        }
        setGame();
        setTimeout(updateGame, 500);
    }
    // Init
    init();
})(window);