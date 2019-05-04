// ==UserScript==
// @name        Slither.io Mod Pack
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  User Script Authors: kmc, Slither King, Super Varken
// @author       MOD Packer
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function(w) {
    var modVersion = "v0.0.2",
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
            div.style.color = "#FFF";
            div.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
            div.style.fontSize = "14px";
            div.style.textAlign = "center";
            div.style.opacity = "0.5";
            div.style.margin = "0 auto";
            div.style.padding = "10px 0";
            div.textContent = "Have Fun With My Mod:)";
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
            sltMenu.innerHTML = "MOD: <strong>Lev PROJECT</strong> | <strong>" + modVersion + "</strong>";
            login.appendChild(sltMenu);
            // IP input container
            var div = document.createElement("div");
            div.style.color = "#8058D0";
            div.style.backgroundColor = "#4C447C";
            div.style.borderRadius = "29px";
            div.style.margin = "10 auto";
            div.style.padding = "8px";
            sltMenu.appendChild(div);
            // IP input
            var input = document.createElement("input");
            input.id = "server-ip";
            input.type = "text";
            input.placeholder = "Server IP";
            input.style.height = "24px";
            input.style.display = "inline-block";
            input.style.background = "none";
            input.style.color = "#e0e0ff";
            input.style.border = "none";
            input.style.outline = "none";
            div.appendChild(input);
            // Connect (play) button
            var button = document.createElement("input");
            button.id = "connect-btn";
            button.type = "button";
            button.value = "Play";
            button.style.height = "24px";
            button.style.display = "inline-block";
            button.style.borderRadius = "12px";
            button.style.color = "#FFF";
            button.style.backgroundColor = "#56ac81";
            button.style.border = "none";
            button.style.outline = "none";
            button.style.cursor = "pointer";
            button.style.padding = "0 20px";
            div.appendChild(button);
            // Select graph container
            var div = document.createElement("div");
            div.style.backgroundColor = "#A5A5A5";
            div.style.borderRadius = "29px";
            div.style.margin = "10 auto";
            div.style.padding = "8px";
            sltMenu.appendChild(div);
            // Select graph
            var select = document.createElement("select");
            select.id = "select-graph";
            select.style.background = "none";
            select.style.border = "none";
            select.style.outline = "none";
            div.appendChild(select);
            var option = document.createElement("option");
            option.value = "3";
            option.text = "Graphics: normal";
            select.appendChild(option);
            var option = document.createElement("option");
            option.value = "2";
            option.text = "Graphics: optimized";
            select.appendChild(option);
            var option = document.createElement("option");
            option.value = "1";
            option.text = "Graphics: low";
            select.appendChild(option);
            // Menu footer
            sltMenu.innerHTML += '<a href="https://www.youtube.com/channel/UCn2vRacPtoOJqvFMrzFZ0gA" target="_blank" style="color: #FFF; opacity: 0.35;">YT Channel1</a> | ';
            sltMenu.innerHTML += '<a href="https://www.facebook.com/Aryo.w462" target="_blank" style="color: #FFF; opacity: 0.35;">Facebook</a> | ';
            sltMenu.innerHTML += '<a href="https://www.youtube.com/channel/UCeEyx_6vPnOuyVZfFx0MeVw" target="_blank" style="color: #FFF; opacity: 0.35;">YT Channel2</a> | ';
            // Get IP input
            inpIP = document.getElementById("server-ip");
            // Get nick
            var nick = document.getElementById("nick");
            nick.addEventListener("input", getNick, false);
            // Force connect
            var connectBtn = document.getElementById("connect-btn");
            connectBtn.onclick = forceConnect;
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
            w.lbh.textContent = "Lev PROJECT";
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

(function(w) {

//Append div

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


(function() {

if (localStorage.savec) {
        
   document.body.style.backgroundColor = localStorage.getItem("savec");
        }
    if (localStorage.savei) {
        
   ii.src = localStorage.getItem("savei");
        }

bgImage = null;    
var parent = document.getElementById('playh');
var div = document.createElement('div');
var input = document.createElement('input');
    var input2 = document.createElement('input');
var button = document.createElement('span');
    var button2 = document.createElement('span');


input.type = 'color';
   
input.style.margin = '2px';
input.style.background = 'rgba(0, 0, 0, 0) none repeat scroll 0 0';
input.style.border = '0 none';
input.style.color = '#e0e0ff';
input.style.fontSize = '15px';
input.id = 'nice';
input.value = '#161c22';

button.textContent = 'Change colour!';
button.style.cursor = 'pointer';
button.style.color = '#FFF';
button.style.borderRadius = '24px';
button.style.margin = '2px';
button.style.padding = '2px 6px';
button.style.background = 'linear-gradient(180deg, #9DA, #485)';
button.onclick = function() { colour(); };

input2.setAttribute("type", "file");
    input2.setAttribute("accept", "  image/*");
 
input2.style.margin = '2px';
input.style.background = 'rgba(0, 0, 0, 0) none repeat scroll 0 0';
input2.style.border = '0 none';
input2.style.color = '#e0e0ff';
input2.style.fontSize = '15px';
input2.id = 'nicer';

button2.textContent = 'Change background!';
button2.style.cursor = 'pointer';
button2.style.color = '#FFF';
button2.style.borderRadius = '24px';
button2.style.margin = '2px';
button2.style.padding = '2px 6px';
button2.style.background = 'linear-gradient(180deg, #9DA, #485)';
button2.onclick = function() { image(); };   
    
    
    
    
div.appendChild(input);
div.appendChild(button);
    div.appendChild(input2);
div.appendChild(button2);

parent.appendChild(div);


})();

function colour(){
 

theColour = document.getElementById('nice').value;
localStorage.setItem("savec", theColour);
document.body.style.backgroundColor = localStorage.getItem("savec");
}

function image(){
      
        //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           theImage = reader.result;
localStorage.setItem("savei", theImage);
ii.src = localStorage.getItem("savei");
           
      

       };

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  
    
  

}

var zoomNum = 0.9;
var maxZoom = 2;
var minZoom = 0.2;
var zoomRate = 0.1;

setInterval(function(){
    if(zoomNum > maxZoom) {
        console.log("adding");
        zoomNum -= 0.1;
    } else if(zoomNum < minZoom){
        console.log("subrtacting")
        zoomNum += 0.1;
    }

    unsafeWindow.gsc = zoomNum;
}, 50);

function changeZoom(e) {
    if(zoomNum < maxZoom && zoomNum > minZoom){
        var delta = (e.wheelDelta / Math.abs(e.wheelDelta));
        zoomNum += zoomRate * delta;
    }
}

document.body.onmousewheel = changeZoom;

appendInput();
function appendInput(){
    var div = document.querySelector(".taho").parentElement;
    
    var html = `<div class="taho" id="nick_holder" style="width: 244px; margin-top: 34px; box-shadow: rgb(0, 0, 0) 0px 6px 50px; opacity: 1; background: rgb(76, 68, 124);">
                    <input class="sumsginp" id="ip_address" style="width: 220px; height: 24px;" placeholder="IP Address" maxlength="24">
                </div>`;
    
    var node = document.createElement('div');
    node.innerHTML = html;
    node = node.children[0];

    div.appendChild(node);
}

document.querySelector(".sadg1").addEventListener("click", function(){
    var ipAddressInput = document.querySelector("#ip_address");

    if(ipAddressInput.value != ""){
        if(ipAddressInput.value != unsafeWindow.bso.ip){
            unsafeWindow.bso.ip = ipAddressInput.value;
            unsafeWindow.connect();
        }
    } else {
        ipAddressInput.value = unsafeWindow.bso.ip;
    }
});

initStatsHTML();
function initStatsHTML(){
    var node = document.createElement('div');
    node.id = "stats";

    document.body.appendChild(node);

    document.querySelector("iframe[src='/social-box/']").src = "";

    var css = `
        #stats-wrapper{
            position: absolute;
            z-index: 7;
            background-color: rgba(40, 40, 40, .7);
            color: white;
        }
    `;

    GM_addStyle(css);
}

setInterval(function(){
    if(unsafeWindow.playing){
        var html = `
            <div id="stats-wrapper">
                IP: ` + unsafeWindow.bso.ip + `<br>
                X: ` + Math.round(snake.xx) + `<br>
                Y: ` + Math.round(snake.yy) + `<br>
                <button onclick="window.connect()">Respawn</button>
            </div>
        `;

        var statsDiv = document.querySelector("#stats");
        statsDiv.innerHTML = html;
    }
}, 500);

(function() {
    'use strict';

    var loopTheLoop = true; var nextSkin = 0; var theLoop = setInterval(function() { if (loopTheLoop) { if (nextSkin > 25) nextSkin = 0; if (snake !== null) setSkin(snake, nextSkin); nextSkin++; } else { clearInterval(theLoop); } }, 100);
})();