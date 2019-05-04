// ==UserScript==
// @name         Arif[Gaming]Network Zoom And Change Skin For Slither.io [Otomatis Ganti Skin]
// @version      2.2.0
// @description  Zoom Hack And Auto Skin Changer For Slither.io
// @author       Arif[Gaming]Network
// @namespace    ArifMaulana
// @match        http://slither.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var loopTheLoop = true; var nextSkin = 0; var theLoop = setInterval(function() { if (loopTheLoop) { if (nextSkin > 25) nextSkin = 0; if (snake !== null) setSkin(snake, nextSkin); nextSkin++; } else { clearInterval(theLoop); } }, 400);
    (function(w) {
    var modVersion = "v2.2.0",
        renderMode = 2, // 3 - normal, 2 - optimized, 1 - simple (mobile)
        normalMode = false,
        gameFPS = null,
        positionHUD = null,
        ipHUD = null,
        fpsHUD = null,
        styleHUD = "color: #FFF; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; position: fixed; opacity: 0.35; z-index: 7;",
        inpNick = null,
        currentIP = null,
        retry = 0,
        bgImage = null;
    function init() {
        // Append DIVs
        appendDiv("position-hud", "nsi", styleHUD + "right: 30; bottom: 120px;");
        appendDiv("ip-hud", "nsi", styleHUD + "right: 30; bottom: 150px;");
        appendDiv("fps-hud", "nsi", styleHUD + "right: 30; bottom: 170px;");
        positionHUD = document.getElementById("position-hud");
        ipHUD = document.getElementById("ip-hud");
        fpsHUD = document.getElementById("fps-hud");
        // Add zoom
        if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener("DOMMouseScroll", zoom, false);
        } else {
            document.body.onmousewheel = zoom;
        }
        // Quick resp (ESC)
        w.onkeydown = function(e) {
            if (e.keyCode == 27) {
                forceConnect();
            }
        }
        // Hijack console log
        /*
        if (w.console) {
            w.console.logOld = console.log;
            w.console.log = getConsoleLog;
        }
        */
        // Set menu
        setMenu();
        // Set leaderboard
        setLeaderboard();
        // Set graphics
        setGraphics();
        // Update loop
        updateLoop();
        // Show FPS
        showFPS();
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
        w.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
    }
    // Get console log
    function getConsoleLog(log) {
        //w.console.logOld(log);
        if (log.indexOf("FPS") != -1) {
            gameFPS = log;
        }
    }
    // Set menu
    function setMenu() {
        var login = document.getElementById("login");
        if (login) {
            // Load settings
            loadSettings();
            // Message
            var div = document.createElement("div");
            div.style.width = "300px";
            div.style.color = "#EE82EE";
            div.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
            div.style.fontSize = "14px";
            div.style.textAlign = "center";
            div.style.opacity = "0.5";
            div.style.margin = "0 auto";
            div.style.padding = "10px 0";
            div.textContent = "Auto Skin Changer & Zoom Out";
            login.appendChild(div);
            // Menu container
            var sltMenu = document.createElement("div");
            sltMenu.style.width = "260px";
            sltMenu.style.color = "#8058D0";
            sltMenu.style.backgroundColor = "#1e262e";
            sltMenu.style.borderRadius = "29px";
            sltMenu.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
            sltMenu.style.fontSize = "14px";
            sltMenu.style.textAlign = "center";
            sltMenu.style.margin = "0 auto 100px auto";
            sltMenu.style.padding = "10px 14px";
            sltMenu.innerHTML = "MADE BY: <strong>S & A GAMING</strong> | <strong>" + modVersion + "</strong>";
            login.appendChild(sltMenu);
            // IP input container
            var div = document.createElement("div");
            div.style.color = "#8058D0";
            div.style.backgroundColor = "#4C447C";
            div.style.borderRadius = "29px";
            div.style.margin = "10 auto";
            div.style.padding = "8px";
            sltMenu.appendChild(div);
            
            
            
            
            
            
            connectBtn.onclick = forceConnect;
            // Get servers list
            getServersList();
            // Set graphic mode
            var selectGraph = document.getElementById("select-graph");
            if (renderMode == 1) {
                selectGraph.selectedIndex = 2;
            } else if (renderMode == 2) {
                selectGraph.selectedIndex = 1;
            } else {
                selectGraph.selectedIndex = 0;
                normalMode = true;
            }
            selectGraph.onchange = function() {
                var mode = selectGraph.value;
                if (mode) {
                    renderMode = mode;
                    localStorage.setItem("rendermode", renderMode);
                }
            };
            resizeView();
        } else {
            setTimeout(setMenu, 100);
        }
    }
    // Load settings
    function loadSettings() {
        if (w.localStorage.getItem("nick") != null) {
            var nick = w.localStorage.getItem("nick");
            document.getElementById("nick").value = nick;
        }
        if (w.localStorage.getItem("rendermode") != null) {
            var mode = parseInt(w.localStorage.getItem("rendermode"));
            if (mode >= 1 && mode <= 3) {
                renderMode = mode;
            }
        }
    }
    // Get nick
    function getNick() {
        var nick = document.getElementById("nick").value;
        w.localStorage.setItem("nick", nick);
    }
    // Connection status
    function connectionStatus() {
        if (!w.connecting || retry == 10) {
            w.forcing = false;
            retry = 0;
            return;
        }
        retry++;
        setTimeout(connectionStatus, 1000);
    }
    // Force connect
    function forceConnect() {
        if (inpIP.value.length == 0 || !w.connect) {
            return;
        }
        w.forcing = true;
        if (!w.bso) {
            w.bso = {};
        }
        var srv = inpIP.value.trim().split(":");
        w.bso.ip = srv[0];
        w.bso.po = srv[1];
        w.connect();
        setTimeout(connectionStatus, 1000);
    }
    // Get servers list
    function getServersList() {
        if (w.sos && w.sos.length > 0) {
            var selectSrv = document.getElementById("select-srv");
            for (var i = 0; i < sos.length; i++) {
                var srv = sos[i];
                var option = document.createElement("option");
                option.value = srv.ip + ":" + srv.po;
                option.text = (i + 1) + ". " + option.value;
                selectSrv.appendChild(option);
            }
            selectSrv.onchange = function() {
                var srv = selectSrv.value;
                inpIP.value = srv;
            };
        } else {
            setTimeout(getServersList, 100);
        }
    }
    // Resize view
    function resizeView() {
        if (w.resize) {
            w.lww = 0; // Reset width (force resize)
            w.wsu = 0; // Clear ad space
            w.resize();
            var wh = Math.ceil(w.innerHeight);
            if (wh < 800) {
                var login = document.getElementById("login");
                w.lgbsc = wh / 800;
                login.style.top = - (Math.round(wh * (1 - w.lgbsc) * 1E5) / 1E5) + "px";
                if (w.trf) {
                    w.trf(login, "scale(" + w.lgbsc + "," + w.lgbsc + ")");
                }
            }
        } else {
            setTimeout(resizeView, 100);
        }
    }
    // Set leaderboard
    function setLeaderboard() {
        if (w.lbh) {
            w.lbh.textContent = "Created By Smiles";
            w.lbh.style.fontSize = "20px";
        } else {
            setTimeout(setLeaderboard, 100);
        }
    }
    // Set normal mode
    function setNormalMode() {
        normalMode = true;
        w.ggbg = true;
        if (!w.bgp2 && bgImage) {
            w.bgp2 = bgImage;
        }
        w.render_mode = 2;
    }
    // Set graphics
    function setGraphics() {
        if (renderMode == 3) {
            if (!normalMode) {
                setNormalMode();
            }
            return;
        }
        if (normalMode) {
            normalMode = false;
        }
        if (w.want_quality && w.want_quality != 0) {
            w.want_quality = 0;
            w.localStorage.setItem("qual", "0");
            w.grqi.src = "/s/lowquality.png";
        }
        if (w.ggbg && w.gbgmc) {
            w.ggbg = false;
        }
        if (w.bgp2) {
            bgImage = w.bgp2;
            w.bgp2 = null;
        }
        if (w.high_quality) {
            w.high_quality = false;
        }
        if (w.gla && w.gla != 0) {
            w.gla = 0;
        }
        if (w.render_mode && w.render_mode != renderMode) {
            w.render_mode = renderMode;
        }
    }
    // Show FPS
    function showFPS() {
        if (w.playing && fpsHUD && w.fps && w.lrd_mtm) {
            if (Date.now() - w.lrd_mtm > 970) {
                fpsHUD.textContent = "FPS: " + w.fps;
            }
        }
        setTimeout(showFPS, 30);
    }
    // Update loop
    function updateLoop() {
        setGraphics();
        if (w.playing) {
            if (positionHUD) {
                positionHUD.textContent = "X: " + (~~w.view_xx || 0) + " Y: " + (~~w.view_yy || 0);
            }
            if (inpIP && w.bso && currentIP != w.bso.ip + ":" + w.bso.po) {
                currentIP = w.bso.ip + ":" + w.bso.po;
                inpIP.value = currentIP;
                if (ipHUD) {
                    ipHUD.textContent = "IP: " + currentIP;
                }
            }
        }
        setTimeout(updateLoop, 1000);
    }
    // Init
    init();
})(window);
})();