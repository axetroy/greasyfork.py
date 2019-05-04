// ==UserScript==
// @name         Mopertop's Slithere.com
// @version      1.0
// @description  Mopertop's for Slither.IO
// @author       Slithere.com
// @namespace    Slithere.com
// @match        http://slither.io/
// @grant        none
// ==/UserScript==

function start() {
  try {
    newFood(3,snake.xx,snake.yy,50,5,Math.floor(Math.random() * 7) + 1);
}
catch(err) {

}
  setTimeout(start, 100);
}

// boot up the first call
start();

(function(w) {
    var modVersion = "v0.1.16",
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
        bgImage = null,
		rotate = false;
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
        // Keys
        w.addEventListener("keydown", function(e) {
			switch(e.keyCode) {
				// ESC - quick resp
				case 27: forceConnect();
					break;
				// A - Auto skin rotator
				case 65: rotate = !rotate; rotateSkin();
					break;
				// Q - Quit to menu
				case 81: quit();
					break;
				// S - Change skin
				case 83: changeSkin();
					break;
				// Z - Reset zoom
				case 90: resetZoom();
					break;
			}
        }, false);
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
        if (!w.gsc || !w.playing) {
            return;
        }
        w.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
    }
	// Reset zoom
	function resetZoom() {
		w.gsc = 0.9;
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
			// Unblock skins
			w.localStorage.setItem("edttsg", "1");
            // Load settings
            loadSettings();
            // Keys info
            var div = document.createElement("div");
            div.style.width = "300px";
            div.style.color = "#56ac81";
            div.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
            div.style.fontSize = "12px";
            div.style.textAlign = "center";
            div.style.opacity = "0.5";
            div.style.margin = "0 auto";
            div.style.padding = "10px 0";
            div.innerHTML = "[ESC] - Quick resp | [Q] - Quit to menu<br/>[A] - Auto skin rotator | [S] - Change skin<br/>[Z] - Reset zoom | [Space] - Boost";
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
            sltMenu.innerHTML = "MOD: <strong>SLITio by szymy</strong> | <strong>" + modVersion + "</strong>";
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
            input.placeholder = "Server address (IP:port)";
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
            // Select server container
            var div = document.createElement("div");
            div.style.backgroundColor = "#919191";
            div.style.borderRadius = "29px";
            div.style.margin = "10 auto";
            div.style.padding = "8px";
            sltMenu.appendChild(div);
            // Select server
            var select = document.createElement("select");
            select.id = "select-srv";
            select.style.background = "none";
            select.style.border = "none";
            select.style.outline = "none";
            var option = document.createElement("option");
            option.value = "";
            option.text = "-- Select a server --";
            select.appendChild(option);
            div.appendChild(select);
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
            sltMenu.innerHTML += '<a href="http://ogario.ovh" target="_blank" style="color: #56ac81;">Visit ogario.ovh</a> | ';
			sltMenu.innerHTML += '<a href="https://www.youtube.com/channel/UCaWiPNJWnhzYDrBQoXokn6w" target="_blank" style="color: #56ac81;">YT Channel</a>';
            // Get IP input
            inpIP = document.getElementById("server-ip");
            // Get nick
            var nick = document.getElementById("nick");
            nick.addEventListener("input", getNick, false);
            // Force connect
            var connectBtn = document.getElementById("connect-btn");
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
            w.lbh.textContent = "MOD: Boss by mopertop";
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
                    ipHUD.textContent = "Server: " + currentIP;
                }
            }
        } else {
			positionHUD.textContent = "";
			fpsHUD.textContent = "";
		}
        setTimeout(updateLoop, 1000);
    }
	// Change skin
	function changeSkin() {
		if (w.playing && w.snake != null) {
			var skin = w.snake.rcv;
			skin++;
			if (skin > w.max_skin_cv) {
				skin = 0;
			}
			w.setSkin(w.snake, skin);
		}
	}
	// Rotate skin
	function rotateSkin() {
		if (!rotate) {
			return;
		}
		changeSkin();
		setTimeout(rotateSkin, 1000);
	}
	// Quit to menu
	function quit() {
        if (w.playing) {
            w.want_close_socket = true;
            w.dead_mtm = 1;
			if (w.ws) {
				w.ws.close();
				w.ws = null;
			}
            w.playing = w.connected = false;
            w.resetGame();
            w.play_btn.setEnabled(true);
        }
    }
    // Init
    init();
})(window);

(function(w) {
    var modVersion = 'v0.6.9.11', //used in menu box
        graphicsMode = '4', //4 - customized high quality 3 - high quality, 2 - simple optimized, 1 - simple (mobile)
        graphicsModeChanged = true, //flag to indicate graphics mode has changed
        statsContainer = null, //reference to stats container
        fpsContainer = null, //reference to fps div
        xferContainer = null, //refernce to current transfer rate div
        zoomContainer = null, //reference to zoom div
        positionContainer = null, //reference to coordinates div
        ipContainer = null, //reference to current/last connected server div
        highscoreContainer = null, //reference to high score display
        clockContainer = null, //reference to clock container
        backgroundImage = -1, //store the user selected background image
        randomizeBackground = false, //indicate whether or not to randomize background
        originalBackground = null, //store the game's default background image
        originalBackgroundCanvas = null, //store the game's default background canvas object
        backgroundImageChanged = true, //indicate if background image needs to be set
        clearedGlow = false, //store whether glow was attempted to be cleared
        highScore = 0, //store the user's current high score
        currentIP = null, //store the current connected server ip
        selectedServer = -1, //store the user selected server ip
        selectedSkinOption = -1, //Store skin option
        selectedSkin = null, //Store skin number
        manualServer = false, //store user manual server entry
        connectButtonOverride = false, //store whether the connect button click listener was overridden
        connectButton = null,  //reference to the connect button
        retry = 0; //hold the current number of connection retries

    /**
     * Init script
     */
    function init() {
        createCSS();

        stopLogoAnimation();

        statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.innerHTML = ' \
            <div id="fps-container"></div> \
            <div id="xfer-container"></div> \
            <div id="zoom-container"></div> \
            <div id="position-container"></div> \
            <div id="ip-container"></div> \
            <div id="highscore-container"></div> \
            <div id="clock-container"></div> \
        ';
        document.body.appendChild(statsContainer);

        fpsContainer = document.getElementById('fps-container');
        xferContainer = document.getElementById('xfer-container');
        zoomContainer = document.getElementById('zoom-container');
        positionContainer = document.getElementById('position-container');
        ipContainer = document.getElementById('ip-container');
        highscoreContainer = document.getElementById('highscore-container');
        clockContainer = document.getElementById('clock-container');

        // Add zoom
        if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener('DOMMouseScroll', zoom, false);
        } else {
            document.body.onmousewheel = zoom;
        }

        //Setup keyboard shortcuts
        w.onkeydown = function(e) {
            switch (e.keyCode) {
                //Toggle stats (tab)
                case 9:
                    e.preventDefault();
                    toggleStats();
                    break;
                //Respawn (escape)
                case 27:
                    disconnect(false);
                    customConnect();
                    break;
                //Disconnect (q)
                case 81:
                    disconnect(true);
                    break;
                //Reset zoom (~ tilde)
                case 192:
                    resetZoom();
                    break;
            }
        };

        addEventListener

        // Set menu
        setupMenu();
        // Override play button behavior
        customConnectButton();
        // Setup graphics
        setupGraphics();
        // Update loop
        updateLoop();
        // Show FPS
        showFPS();
    }

    /**
     * Prevent laggy logo animation
     */
    function stopLogoAnimation() {
        if (typeof w.showlogo_iv !== 'undefined') {
            w.ncka = w.lgss = w.lga = 1;
            clearInterval(w.showlogo_iv);
            showLogo(true);
        } else {
            setTimeout(stopLogoAnimation, 25);
        }
    }

    /**
     * Create stylesheet in head
     */
    function createCSS() {
        var styleElement = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        styleElement.type = 'text/css';

        var cssString = ' \
            body { \
                background-color: #000!important; \
                overflow-x:hidden; \
            } \
            #nbg { \
                display:none; \
                visibility:hidden; \
            } \
            #clq { \
                bottom:0!important; \
                height:auto!important; \
            } \
            #grqh { \
                top: auto!important; \
                right: auto!important; \
                bottom: 20px; \
                left: 150px; \
            } \
            #login { \
                /* margin-top:0!important; */ \
                position:relative!important; \
                width:auto!important; \
                height:auto!important; \
            } \
            #logo { \
                /* margin-top:30px!important; */ \
            } \
            #stats-container { \
                position:fixed; \
                right: 30px; \
                bottom: 120px; \
                opacity: 0.35; \
                z-index: 7; \
                color: #FFF; \
                font: 14px Arial, Helvetica Neue, Helvetica, sans-serif; \
                text-align: right; \
            } \
            #custom-menu-container { \
                width:260px; \
                color:#8058D0; \
                background-color:#1E262E; \
                border-radius:29px; \
                font: 14px Lucida Sans Unicode, Lucida Grande, sans-serif; \
                text-align:center; \
                margin: 20px auto 0; \
                padding:10px 14px; \
            } \
            .custom-select-container { \
                background-color:#A5A5A5; \
                border-radius:10px; \
                margin:5px auto; \
                padding:5px 0; \
            } \
            .custom-select-container select { \
                width:100%; \
                background:none; \
                border:none; \
                outline:none; \
            } \
            #server-manual-input { \
                width: 100%; \
                display:none; \
                margin: 3px auto; \
                width: 98%; \
                background-color: #4C447C; \
                border: 1px solid #1E262E; \
                color: #e0e0ff; \
                border-radius: 3px; \
                padding: 3px 3px; \
            } \
            #hotkey-help { \
                margin:0; \
                padding:0; \
                display:flex; \
                flex-wrap:wrap; \
            } \
            #hotkey-help li { \
                display:inline; \
                white-space:nowrap; \
                flex-grow:1; \
            } \
            #clock-container { \
                font-weight:900; \
                font: 14px Courier New, Courier, monospace; \
            } \
        ';

        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssString;
        } else {
            styleElement.appendChild(document.createTextNode(cssString));
        }
    }

    /**
     * Toggle display of stats window
     */
    function toggleStats() {
        if (statsContainer.style.display == 'none') {
            statsContainer.style.display = 'block';
        } else {
            statsContainer.style.display = 'none';
        }
    }

    /**
     * Calculate zoom from mousewheel
     */
    function zoom(e) {
        if (!w.gsc || !w.playing) {
            return;
        }

        w.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);

        zoomContainer.textContent = 'Zoom: ' + w.gsc.toFixed(2);
    }

    /**
     * Reset zoom to default level
     */
    function resetZoom() {
        w.gsc = 0.9;

        zoomContainer.textContent = 'Zoom: ' + w.gsc.toFixed(2);
    }

    /**
     * Setup main menu
     */
    function setupMenu() {
        var login = document.getElementById('login');
        var playButtonContainer = document.getElementById('playh');
        if (playButtonContainer) {
            // Load settings
            loadSettings();

            //Create container
            var menuContainer = document.createElement('div');
            menuContainer.id = 'custom-menu-container';
            menuContainer.innerHTML = '\
                <div class="custom-select-container"> \
                    <select id="server-select"> \
                        <option value="-1">Server: Default Closest</option> \
                        <option value="-2">Server: Random</option> \
                        <option value="-3">Server: Manual Input</option> \
                    </select> \
                    <input type"text" id="server-manual-input"> \
                </div> \
                <div class="custom-select-container"> \
                    <select id="graphics-select"> \
                        <option value="4">Graphics: customized</option> \
                        <option value="3">Graphics: normal</option> \
                        <option value="2">Graphics: no background</option> \
                        <option value="1">Graphics: low</option> \
                    </select> \
                </div> \
                <div class="custom-select-container" id="background-select-container"> \
                    <select id="background-select"> \
                        <option value="-2">Background Image: Random</option> \
                        <option value="-1">Background Image: Default</option> \
                        <option value="http://i.imgur.com/YioXLYV.jpg">Grid</option> \
                        <option value="http://i.imgur.com/Iffij8a.jpg">Cats</option> \
                        <option value="http://i.imgur.com/jYFIA9J.jpg">Dirt</option> \
                        <option value="http://i.imgur.com/wQIghye.jpg">Grass</option> \
                        <option value="http://i.imgur.com/HVnFfK9.jpg">Magma Storm</option> \
                        <option value="http://i.imgur.com/HaxzRtX.jpg">Wood</option> \
                        <option value="http://i.imgur.com/kQvgICX.jpg">Stonewall</option> \
                        <option value="http://i.imgur.com/bwfU0Qr.jpg">Hungry Like Wolf</option> \
                        <option value="http://i.imgur.com/TyKD6Ie.png">Shaq-fu</option> \
                    </select> \
                </div> \
                <div class="custom-select-container" id="skin-select-container"> \
                    <select id="skin-select"> \
                        <option value="-1">Skins: Default Single Skin</option> \
                        <option value="1">Skins: Random Per Game</option> \
                        <option value="2">Skins: Rotate All</option> \
                    </select> \
                </div> \
                <ul id="hotkey-help"> \
                    <li>[Mousewheel] Zoom</li> \
                    <li>[~] Reset Zoom</li> \
                    <li>[ESC] Respawn</li> \
                    <li>[Q]uit Game</li> \
                    <li>[TAB] Toggle Stats</li> \
                </ul> \
                <strong>607ch00 remix</strong> | <strong>' + modVersion + '</strong> \
            ';

            login.insertBefore(menuContainer, playButtonContainer);

            //Capture and store nickname
            var nick = document.getElementById('nick');
            nick.addEventListener("input", getNick, false);

            //Set graphics mode
            var selectGraphics = document.getElementById('graphics-select');
            selectGraphics.value = graphicsMode;
            toggleBackgroundSelect();

            selectGraphics.onchange = function() {
                var mode = selectGraphics.value;
                if (mode) {
                    graphicsMode = mode;
                    w.localStorage.setItem('graphics-mode', graphicsMode);
                    toggleBackgroundSelect();
                    graphicsModeChanged = true;
                    backgroundImageChanged = true;
                    if (graphicsMode != '4') {
                        randomizeBackground = false;
                    } else {
                        if (w.localStorage.getItem('background-image') == '-2') {
                            randomizeBackground = true;
                        }
                    }
                }
            };

            //Set background options
            var selectBackground = document.getElementById('background-select');
            if (selectBackground) {
                selectBackground.value = backgroundImage;
            }
            selectBackground.onchange = function() {
                backgroundImage = selectBackground.value;
                w.localStorage.setItem('background-image', backgroundImage);
                graphicsModeChanged = true;
                backgroundImageChanged = true;
                randomizeBackground = (backgroundImage == '-2') ? true : false;
            };

            //Set server options
            getServersList();

            var selectServer = document.getElementById('server-select');
            var inputServerManual = document.getElementById('server-manual-input');

            if (selectedServer) {
                selectServer.value = selectedServer;
                inputServerManual.style.display = (selectedServer === '-3') ? 'block' : 'none';
            }

            if (manualServer && manualServer !== 'false') {
                inputServerManual.value = manualServer;
            }

            selectServer.onchange = function() {
                selectedServer = selectServer.value;

                if (selectedServer === '-3') {
                    inputServerManual.style.display = 'block';
                    inputServerManual.focus();
                } else {
                    inputServerManual.style.display = 'none';
                }
                
                w.localStorage.setItem('server-selected', selectedServer);
            };

            inputServerManual.onchange = function() {
                manualServer = inputServerManual.value;
                w.localStorage.setItem('server-manual', manualServer);
            };
            
            //Set skin options
            var selectSkin = document.getElementById('skin-select');
            if (selectedSkinOption) {
                selectSkin.value = selectedSkinOption;
            }
            selectSkin.onchange = function() {
                selectedSkinOption = selectSkin.value;
                w.localStorage.setItem('skin-select', selectedSkinOption);
            }

            //Move this out of the way
            document.body.appendChild(document.getElementById('nbg'));

            resizeView();
        } else {
            setTimeout(setupMenu, 100);
        }
    }

    /**
     * Validate IP address format
     */
    function validIP (ip) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
    }

    /**
     * Toggle availablility of background image selection based on graphics mode
     */
    function toggleBackgroundSelect() {
        if (graphicsMode == '4') {
            document.getElementById('background-select-container').style.display = 'block';
        } else {
            document.getElementById('background-select-container').style.display = 'none';
        }
    }

    /**
     * Select a random background when the game loads
     */
    function randomBackground() {
        var selectBackground = document.getElementById('background-select');
        var backgroundOptions = selectBackground.getElementsByTagName('option');
        var randomSelection = Math.floor(Math.random() * (backgroundOptions.length-1))+1;
        backgroundImage = backgroundOptions[randomSelection].value;
        backgroundImageChanged = true;
    }

    /**
     * Load settings from browser local storage
     */
    function loadSettings() {
        //Enable skins
        localStorage.setItem('edttsg', 1);

        if (w.localStorage.getItem('nick') !== null) {
            var nick = w.localStorage.getItem('nick');
            document.getElementById('nick').value = nick;
        }

        if (w.localStorage.getItem('high-score') !== null) {
             highScore = parseInt(w.localStorage.getItem('high-score'));
             highscoreContainer.textContent = 'Hi Score: ' + highScore;
        }

        if (w.localStorage.getItem('graphics-mode') !== null) {
            var mode = parseInt(w.localStorage.getItem('graphics-mode'));
            if (mode >= 1 && mode <= 4) {
                graphicsMode = mode;
            }
        } else {
            w.localStorage.setItem('graphics-mode', '4');
        }

        if (w.localStorage.getItem('background-image') !== null) {
            backgroundImage = w.localStorage.getItem('background-image');
            randomizeBackground = (backgroundImage == '-2' && graphicsMode == '4') ? true : false;
        } else {
            w.localStorage.setItem('background-image', '-2');
        }

        if (w.localStorage.getItem('server-selected') !== null) {
            selectedServer = w.localStorage.getItem('server-selected');
        } else {
            w.localStorage.setItem('server-selected', selectedServer);
        }

        if (w.localStorage.getItem('server-manual') !== null) {
            manualServer = w.localStorage.getItem('server-manual');
        } else {
            w.localStorage.setItem('server-manual', false);
        }
        
        if (w.localStorage.getItem('skin-select') !== null) {
            selectedSkinOption = w.localStorage.getItem('skin-select');
        } else {
            w.localStorage.setItem('skin-select', selectedSkinOption);
        }
        
        if (w.localStorage.getItem('snakercv') !== null) {
            selectedSkin = w.localStorage.getItem('snakercv');
        }
    }

    /**
     * Get and store user's nickname
     */
    function getNick() {
        var nick = document.getElementById('nick').value;
        w.localStorage.setItem('nick', nick);
    }

    /**
     * Generate select list of game servers available
     */
    function getServersList() {
        if (w.sos && w.sos.length > 0) {
            var selectSrv = document.getElementById('server-select');
            for (var i = 0; i < sos.length; i++) {
                var srv = sos[i];
                var option = document.createElement('option');
                var serverLoopString = option.value = srv.ip + ':' + srv.po;
                option.text = (i + 1) + '. ' + option.value;
                selectSrv.appendChild(option);
            }
        } else {
            setTimeout(getServersList, 100);
        }
    }

    /**
     * Override default connect button behavior to use custom server lists
     */
    function customConnectButton() {
        connectBtn = document.getElementById('playh').getElementsByClassName('btnt')[0];
        if (connectBtn && !connectButtonOverride) {
            // Force connect
            connectBtn.onclick = customConnect;
        } else {
            setTimeout(customConnectButton, 50);
        }
    }

    /**
     * Custom connection function to allow for selection of server ip, random or default behavior
     */
    function customConnect() {
        if (!w.connect) {
            return;
        }

        if (!connectBtn.disabled) {
            connectBtn.disabled = true;
        } else {
            return false;
        }

        if (randomizeBackground) {
            randomBackground();
        }

        //Handle skin change options
        skinChange();

        //Need to reset this before trying to reconnect
        w.dead_mtm = -1;

        if (selectedServer != '-1') {
            w.forcing = true;
            if (!w.bso) {
                w.bso = {};
            }
        }

        if (selectedServer == '-3') {
            //double check custom server entry
            manualServer = document.getElementById('server-manual-input').value;
            w.localStorage.setItem('server-manual', manualServer);

            var srv = manualServer.trim().split(':');

            if (validIP(srv[0])) {
                w.bso.ip = srv[0];
                w.bso.po = srv[1];
            } else {
                alert('The custom server you entered does not have a valid IP address format');
                document.getElementById('server-manual-input').focus();
                return false;
            }
        } else if (selectedServer == '-2') {
            var connectToServer = w.sos[Math.floor(Math.random()*w.sos.length)];
            w.bso.ip = connectToServer.ip;
            w.bso.po = connectToServer.po;
            selectedServer = connectToServer.ip + ':' + connectToServer.po;
            var selectSrv = document.getElementById('server-select').value = selectedServer;
        } else if (selectedServer != '-1') {
            var srv = selectedServer.trim().split(':');
            w.bso.ip = srv[0];
            w.bso.po = srv[1];
        }

        w.connect();
        setTimeout(connectionStatus, 1000);
    }

    /**
     * Loop to force retry of connection
     */
    function connectionStatus() {
        if (!w.connecting || retry == 10) {
            w.forcing = false;
            retry = 0;
            connectBtn.disabled = false;
            return;
        }
        retry++;
        setTimeout(connectionStatus, 1000);
    }

    /**
     * Force disconnect from game and return to menu
     */
    function disconnect(resetGame) {
        if (w.playing) {
            w.want_close_socket = true;
            w.dead_mtm = Date.now();

            if (resetGame) {
                w.resetGame();
            }
            /*
            w.ws.close();
            w.ws = null;
            w.playing = false;
            w.connected = false;
            w.play_btn.setEnabled(true);
            */
        }
    }
    
    /**
     * Handle random or rotating to next skin
     */
    function skinChange() {
        //Default
        if (selectedSkinOption == -1) {
            return true;
        }

        //Check local storage again in case user switch skin via default interface
        selectedSkin = w.localStorage.getItem('snakercv');

        //Random
        if (selectedSkinOption == 1) {
            selectedSkin =  Math.floor(Math.random() * (w.max_skin_cv+1));
        //Rotate
        } else if (selectedSkinOption == 2) {
            selectedSkin = (selectedSkin > w.max_skin_cv) ? 0 : parseInt(selectedSkin)+1;
        }

        w.localStorage.setItem('snakercv', selectedSkin);
    }

    /**
     * Set up graphics mode
     */
    function setupGraphics() {
        //Store original background image
        if ((!originalBackground || !originalBackgroundCanvas) && w.bgp2 && w.ii) {
            originalBackground = w.ii.src;
            originalBackgroundCanvas = w.bgp2;
        }

        //Handle game graphics quality if needed
        if (graphicsModeChanged) {
            if (graphicsMode == '3') {
                w.grqi.style.display = 'block';
                w.grqi.src = '/s/highquality.png';

                w.want_quality = 1;
                w.localStorage.setItem('qual', '1');

                if (typeof w.high_quality !== 'undefined') {
                    w.high_quality = true;
                }

                //Global alpha
                if (w.gla) {
                    w.gla = 1;
                }

                if (typeof w.render_mode !== 'undefined') {
                    w.render_mode = 2;
                }
            } else {
                if (graphicsMode == '4') {
                    w.grqi.style.display = 'none';
                } else {
                    w.grqi.style.display = 'block';
                    w.grqi.src = '/s/lowquality.png';
                }

                w.want_quality = 0;
                w.localStorage.setItem('qual', '0');

                if (typeof w.high_quality !== 'undefined') {
                    w.high_quality = false;
                }

                //Global alpha
                if (w.gla) {
                    w.gla = 0;
                }

                //Snake rendering
                if (typeof w.render_mode !== 'undefined') {
                    if (graphicsMode == '4') {
                        w.render_mode = 2;
                    } else {
                        w.render_mode = parseInt(graphicsMode);
                    }
                }
            }

            graphicsModeChanged = false;
        }

        //Handle game background change if needed
        if (backgroundImageChanged && typeof w.bgp2 !== 'undefined' && typeof w.ii !== 'undefined') {
            //Customized high quality
            if (graphicsMode == '4') {
                clearGlow();

                if (w.bgp2) {
                    w.bgp2 = originalBackgroundCanvas;
                }

                if (w.ii) {
                    if (backgroundImage != '-1') {
                        w.ii.src = backgroundImage;
                    } else {
                        w.ii.src = originalBackground;
                    }
                }
            //Default quality
            } else if (graphicsMode == '3') {
                if (w.ggbg && w.gbgmc) {
                    w.ggbg = true;
                }
                if (w.bgp2) {
                    w.bgp2 = originalBackgroundCanvas;
                }
                if (w.ii) {
                    w.ii.src = originalBackground;
                }
            //Low quality / no background
            } else {
                clearGlow();
                //Background picture
                if (w.bgp2) {
                    w.bgp2 = null;
                }
            }

            backgroundImageChanged = false;
        }
    }

    /**
     * Clear glow from game
     */
    function clearGlow() {
        if (w.ggbg) {
            w.ggbg = false;
        }
        if (clearedGlow) {
            return;
        } else if (w.gbgi && !clearedGlow) {
            w.gbgi.src = '';
            w.gbgi.onload = null;
            w.gbgi = null;
            if (w.gbgmc) {
                w.gbgmc = null;
            }
            clearedGlow = true;
        } else {
            setTimeout(clearGlow, 50);
        }
    }

    /**
     * Resize the view to the current browser window
     */
    function resizeView() {
        if (w.resize) {
            w.lww = 0; // Reset width (force resize)
            w.wsu = 0; // Clear ad space
            w.resize();
            var wh = Math.ceil(w.innerHeight);
            if (wh < 800) {
                var login = document.getElementById('login');
                w.lgbsc = wh / 800;
                login.style.top = - (Math.round(wh * (1 - w.lgbsc) * 1E5) / 1E5) + 'px';
                if (w.trf) {
                    w.trf(login, 'scale(' + w.lgbsc + ',' + w.lgbsc + ')');
                }
            }
        } else {
            setTimeout(resizeView, 100);
        }
    }

    /**
     * Show FPS
     */
    function showFPS() {
        if (w.playing && w.fps && w.lrd_mtm) {
            if (Date.now() - w.lrd_mtm > 970) {
                fpsContainer.textContent = 'FPS: ' + w.fps;
            }
        }
        setTimeout(showFPS, 250);
    }

    /**
     * Update loop for real-time data
     */
    function updateLoop() {
        setupGraphics();

        //testing this
        //w.testing = true;

        if (w.playing) {
            positionContainer.textContent = 'X: ' + (~~w.view_xx || 0) + ' Y: ' + (~~w.view_yy || 0);

            if (w.bso && currentIP != w.bso.ip + ':' + w.bso.po) {
                currentIP = w.bso.ip + ":" + w.bso.po;
                ipContainer.textContent = 'IP: ' + currentIP;
            }

            if (zoomContainer.innerHTML === '') {
                zoomContainer.textContent = 'Zoom: ' + w.gsc.toFixed(2);
            }

            xferContainer.textContent = 'BPS: ' + w.rdps;

            var currentScore = Math.floor(150 * (w.fpsls[w.snake.sct] + w.snake.fam / w.fmlts[w.snake.sct] - 1) - 50) / 10;
            if (currentScore > highScore) {
                highScore = currentScore;
                localStorage.setItem('high-score', highScore);
                highscoreContainer.textContent = 'Hi Score: ' + highScore;
            }
        } else {
            xferContainer.textContent = '';
            fpsContainer.textContent = '';
            zoomContainer.textContent = '';
            positionContainer.textContent = '';
        }

        //Add/update clock
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var timeValue = "" + ((hours > 12) ? hours - 12 : hours);
        timeValue  += ((minutes < 10) ? ':0' : ':') + minutes;
        timeValue  += ((seconds < 10) ? ':0' : ':') + seconds;
        timeValue  += (hours >= 12) ? ' PM' : ' AM';
        clockContainer.textContent = timeValue;

        //Fix this
        if (typeof window.oncontextmenu === 'function') {
            window.oncontextmenu=null;
        }

        setTimeout(updateLoop, 1000);
    }
    // Init
    init();
})(window);