// @namespace    MM O FERA
// @version      0.4.9
// @description  MOD MM O FERA
// @author       MM O FERA
// @match        http://slither.io/*
// @run-at       document-body
// @grant        none
// ==/UserScript==
// Source: http://slitio.ogario.ovh


(function(w) {
    var modVersion = "v0.10.18",
        renderMode = 2, // 3 - normal, 2 - optimized, 1 - simple (mobile)
        normalMode = false,
        gameFPS = null,
        positionHUD = null,
        ipHUD = null,
		scoreHUD = null,
        fpsHUD = null,
        styleHUD = "color: #FFF; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; position: fixed; opacity: 0.35; z-index: 7;",
        inpNick = null,
        currentIP = null,
        retry = 0,
        bgImage = null,
		rotate = false,
		highScore = 0;
    function init() {
        // Append DIVs
        appendDiv("position-hud", "nsi", styleHUD + "right: 30; bottom: 120px;");
        appendDiv("ip-hud", "nsi", styleHUD + "right: 30; bottom: 150px;");
		appendDiv("score-hud", "nsi", styleHUD + "right: 30; bottom: 170px;");
        appendDiv("fps-hud", "nsi", styleHUD + "right: 30; bottom: 190px;");
        positionHUD = document.getElementById("position-hud");
        ipHUD = document.getElementById("ip-hud");
		scoreHUD = document.getElementById("score-hud");
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
            // Menu container
            var sltMenu = document.createElement("div");
            sltMenu.style.width = "260px";
            sltMenu.style.color = "#acaadd";
            sltMenu.style.backgroundColor = "#681cdb";
            sltMenu.style.borderRadius = "29px";
            sltMenu.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
            sltMenu.style.fontSize = "14px";
            sltMenu.style.textAlign = "center";
            sltMenu.style.margin = "0 auto 100px auto";
            sltMenu.style.padding = "10px 14px";
            sltMenu.innerHTML = "<strong>MM O FERA@n</strong> | <strong>" + modVersion + "</strong>";
            login.appendChild(sltMenu);
            // IP input container
            var div = document.createElement("div");
            div.style.color = "#ff0f0f";
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
            input.style.background = "#ff0f0f";
            input.style.color = "#e0e0ff";
            input.style.border = "#ff0f0f";
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
            button.style.backgroundColor = "#ff0f0f";
            button.style.border = "none";
            button.style.outline = "none";
            button.style.cursor = "pointer";
            button.style.padding = "0 20px";
            div.appendChild(button);
            // Select server container
            var div = document.createElement("div");
            div.style.backgroundColor = "#fff9f9";
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
            div.style.backgroundColor = "#ff0f0f";
            div.style.borderRadius = "29px";
            div.style.margin = "10 auto";
            div.style.padding = "8px";
            sltMenu.appendChild(div);
            // Select graph
            var select = document.createElement("select");
            select.id = "select-graph";
            select.style.background = "#47e86d";
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
            sltMenu.innerHTML += '<a href="https://www.youtube.com/channel/UCIsQAp05H9FFIyUcZoRxTMQ?view_as=subscriber" target="_blank" style="color: #56ac81;">PERU</a> | ';
			sltMenu.innerHTML += '<a href="https://www.youtube.com/channel/UCIsQAp05H9FFIyUcZoRxTMQ?view_as=subscriber" target="_blank" style="color: #56ac81;">LENDA</a>';
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
                    w.localStorage.setItem("rendermode", renderMode);
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
		if (w.localStorage.getItem("highscore") != null) {
            var score = parseFloat(w.localStorage.getItem("highscore"));
            if (score > 0) {
                highScore = score;
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
        setTimeout(connectionStatus, 100);
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
        setTimeout(connectionStatus, 100);
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
            w.lbh.textContent = "MOD MM O FERA";
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
	// Quick resp
	function quickResp() {
        w.dead_mtm = 0;
        w.login_fr = 0;
		forceConnect();
	}
	// Quit to menu
	function quit() {
        if (w.playing && w.resetGame) {
            w.want_close_socket = true;
            w.dead_mtm = 0;
			if (w.play_btn) {
				w.play_btn.setEnabled(true);
			}
			w.resetGame();
        }
    }
	// Change skin
	function changeSkin() {
		if (w.playing && w.snake != null) {
			var skin = w.snake.rcv,
				max = w.max_skin_cv || 25;
			skin++;
			if (skin > max) {
				skin = 0;
			}
			w.setSkin(w.snake, skin);
		}
	}
	
	// Set high score
	function setHighScore() {
		if (!w.snake || !w.fpsls || !w.fmlts) {
			return;
		}
		var currentScore = Math.floor(150 * (w.fpsls[w.snake.sct] + w.snake.fam / w.fmlts[w.snake.sct] - 1) - 50) / 10;
		if (currentScore > highScore) {
			highScore = currentScore;
			w.localStorage.setItem("highscore", highScore);
		}
		if (scoreHUD && highScore > 0) {
			scoreHUD.textContent = "Best score: " + highScore;
		}
	}
    // Show FPS
    function showFPS() {
        if (w.playing && fpsHUD && w.fps && w.lrd_mtm) {
            if (Date.now() - w.lrd_mtm > 970) {
                fpsHUD.textContent = "FPS: " + w.fps;
            }
        }
        setTimeout(showFPS, 15);
    }
    // Update loop
    function updateLoop() {
        setGraphics();
		setHighScore();
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
        setTimeout(updateLoop, 100);
    }
    // Init
    init();
})(window);// ==UserScript==
// @name         Slither.io-bot 0.7.7 / Slithere.com
// @namespace    http://slither.io/
// @version      0.7.702
// @description  Slither.io bot 0.7.7 / Slithere.com
// @author       Slithere.com
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
// Functions needed for the bot
// Custom logging function - disabled by default
window.log = function() {
    if (window.logDebugging) {
        console.log.apply(console, arguments);
    }
};

window.getWidth = function() {
    return window.ww;
};
window.getHeight = function() {
    return window.hh;
};

window.getSnakeLength = function() {
    return (Math.floor(150 * (window.fpsls[window.snake.sct] + window.snake.fam / window.fmlts[window.snake.sct] - 1) - 50) / 10);
};
window.getSnakeWidth = function() {
    return window.snake.sc * 15 * canvas.getScale();
};

window.getX = function() {
    return window.snake.xx;
};
window.getY = function() {
    return window.snake.yy;
};

var canvas = (function() {
    return {
        // Ratio of screen size divided by canvas size.
        canvasRatio: [window.mc.width / window.getWidth(), window.mc.height / window.getHeight()],

        // Spoofs moving the mouse to the provided coordinates.
        setMouseCoordinates: function(x, y) {
            window.xm = x;
            window.ym = y;
        },

        // Convert snake-relative coordinates to absolute screen coordinates.
        mouseToScreen: function(x, y) {
            var screenX = x + (window.getWidth() / 2);
            var screenY = y + (window.getHeight() / 2);
            return [screenX, screenY];
        },

        // Convert screen coordinates to canvas coordinates.
        screenToCanvas: function(x, y) {
            var canvasX = window.csc * (x * canvas.canvasRatio[0]) - parseInt(window.mc.style.left);
            var canvasY = window.csc * (y * canvas.canvasRatio[1]) - parseInt(window.mc.style.top);
            return [canvasX, canvasY];
        },

        // Convert map coordinates to mouse coordinates.
        mapToMouse: function(x, y) {
            var mouseX = (x - window.getX()) * window.gsc;
            var mouseY = (y - window.getY()) * window.gsc;
            return [mouseX, mouseY];
        },

        // Adjusts zoom in response to the mouse wheel.
        setZoom: function(e) {
            // Scaling ratio
            if (window.gsc) {
                window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
            }
        },

        // Restores zoom to the default value.
        resetZoom: function() {
            window.gsc = 0.9;
        },

        // Sets background to the given image URL.
        // Defaults to slither.io's own background.
        setBackground: function(url) {
            url = typeof url !== 'undefined' ? url : '/s/bg45.jpg';
            window.ii.src = url;
        },

        // TODO what does window scale mean?
        getScale: function() {
            return window.gsc;
        },

        // Manual mobile rendering
        toggleMobileRendering: function(mobileRendering) {
            window.mobileRender = mobileRendering;
            window.log('Mobile rendering set to: ' + window.mobileRender);
            userInterface.savePreference('mobileRender', window.mobileRender);
            // Set render mode
            if (window.mobileRender) {
                canvas.setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
                window.render_mode = 1;
            } else {
                canvas.setBackground();
                window.render_mode = 2;
            }
        },

        // Auto mobile rendering.
        toggleAutomaticMobileRendering: function() {
            if (window.autoMobileRender) {
                // Set interval to check the fps and if it is below 20, turn on mobile rendering
                window.mobileRenderInterval = setInterval(function() {
                    canvas.toggleMobileRendering(userInterface.framesPerSecond.getFPS() <= 20);
                }, 5000);
                window.autoMobileRender = false;
                // When more than 20, turn it off
            } else {
                clearInterval(window.mobileRenderInterval);
                window.autoMobileRender = true;
            }
            window.log('Automatic mobile rendering set to: ' + window.autoMobileRender);
            userInterface.savePreference('autoMobileRender', window.autoMobileRender);
        },

        // Draw a dot on the canvas.
        drawDot: function(x, y, radius, colour, fill) {
            var context = window.mc.getContext('2d');
            context.beginPath();
            context.strokeStyle = '#00FF00';
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.closePath();
            if (fill) {
                context.fillStyle = ('green red white yellow black cyan blue'.indexOf(colour) < 0) ? 'white' : colour;
                context.fill();
            }
            context.fillStyle = 'black';
            context.strokeStyle = '#000000';
        },

        // Draw an angle.
        // @param {number} start -- where to start the angle
        // @param {number} angle -- width of the angle
        // @param {bool} danger -- green if false, red if true
        drawAngle: function(start, angle, danger) {
            var context = window.mc.getContext('2d');
            context.globalAlpha = 0.6;
            context.beginPath();
            context.moveTo(window.mc.width / 2, window.mc.height / 2);
            context.arc(window.mc.width / 2, window.mc.height / 2, window.gsc * 100, start, angle);
            context.lineTo(window.mc.width / 2, window.mc.height / 2);
            context.closePath();
            context.fillStyle = (danger) ? 'red' : 'green';
            context.fill();
            context.globalAlpha = 1;
            context.fillStyle = 'black';
        },

        // Draw a line on the canvas.
        drawLine: function(x2, y2, colour) {
            var context = window.mc.getContext('2d');
            var center = [window.mc.height / 2, window.mc.width / 2];
            context.lineWidth = 5 * canvas.getScale();
            context.strokeStyle = (colour === 'green') ? '#00FF00' : '#FF0000';
            context.moveTo(center[1], center[0]);
            context.lineTo(x2, y2);
            context.stroke();
            context.strokeStyle = '#000000';
        },

        // Check if a point is between two vectors.
        // The vectors have to be anticlockwise (sectorEnd on the left of sectorStart).
        isBetweenVectors: function(point, sectorStart, sectorEnd) {
            var center = [window.snake.xx, window.snake.yy];
            if (point.xx) {
                // Point coordinates relative to center
                var relPoint = {
                    x: point.xx - center[0],
                    y: point.yy - center[1]
                };
                return (!canvas.areClockwise(sectorStart, relPoint) &&
                        canvas.areClockwise(sectorEnd, relPoint));
            }
            return false;
        },

        // Angles are given in radians. The overall angle (endAngle-startAngle)
        // cannot be above Math.PI radians (180°).
        isInsideAngle: function(point, startAngle, endAngle) {
            // calculate normalized vectors from angle
            var startAngleVector = {
                x: Math.cos(startAngle),
                y: Math.sin(startAngle)
            };
            var endAngleVector = {
                x: Math.cos(endAngle),
                y: Math.sin(endAngle)
            };
            // Use isBetweenVectors to check if the point belongs to the angle
            return canvas.isBetweenVectors(point, startAngleVector, endAngleVector);
        },

        // Given two vectors, return a truthy/falsy value depending on their position relative to each other.
        areClockwise: function(vector1, vector2) {
            //Calculate the dot product.
            return -vector1.x * vector2.y + vector1.y * vector2.x > 0;
        },

        // Given an object (of which properties xx and yy are not null),
        // return the object with an additional property 'distance'.
        getDistanceFromSnake: function(point) {
            if (point === null) return null;
            point.distance = canvas.getDistance(window.getX(), window.getY(),
                                                point.xx, point.yy);
            return point;
        },

        // Get a distance from point (x1; y1) to point (x2; y2).
        getDistance: function(x1, y1, x2, y2) {
            // Calculate the vector coordinates.
            var xDistance = (x1 - x2);
            var yDistance = (y1 - y2);
            // Get the absolute value of each coordinate
            xDistance = xDistance < 0 ? xDistance * -1 : xDistance;
            yDistance = yDistance < 0 ? yDistance * -1 : yDistance;
            //Add the coordinates of the vector to get a distance. Not the real distance, but reliable for distance comparison.
            var distance = xDistance + yDistance;
            // Real distance but not needed. Here for reference -
            // var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
            return distance;
        },

        // Screen to Canvas coordinate conversion - used for collision detection
        collisionScreenToCanvas: function(circle) {
            var newCircle = canvas.mapToMouse(circle.x, circle.y);
            newCircle = canvas.mouseToScreen(newCircle[0], newCircle[1]);
            newCircle = canvas.screenToCanvas(newCircle[0], newCircle[1]);
            return {
                x: newCircle[0],
                y: newCircle[1],
                radius: circle.radius
            };
        },

        // Check if circles intersect
        circleIntersect: function(circle1, circle2) {
            var bothRadii = circle1.radius + circle2.radius;

            // Pretends the circles are squares for a quick collision check.
            // If it collides, do the more expensive circle check.
            if (circle1.x + bothRadii > circle2.x &&
                circle1.y + bothRadii > circle2.y &&
                circle1.x < circle2.x + bothRadii &&
                circle1.y < circle2.y + bothRadii) {

                var distance = Math.sqrt(Math.pow(circle1.x - circle2.x, 2) +
                                         Math.pow(circle1.y - circle2.y, 2));
                if (distance < bothRadii) {
                    if (window.visualDebugging) {
                        var collisionPointX = ((circle1.x * circle2.radius) + (circle2.x * circle1.radius)) / bothRadii;
                        var collisionPointY = ((circle1.y * circle2.radius) + (circle2.y * circle1.radius)) / bothRadii;
                        canvas.drawDot(collisionPointX, collisionPointY, circle2.radius, 'cyan', true);
                        canvas.drawDot(circle2.x, circle2.y, circle2.radius, 'red', true);
                    }
                    return true;
                }
            }
            return false;
        }
    };
})();

var bot = (function() {
    // Save the original slither.io onmousemove function so we can re enable it back later
    var original_onmousemove = window.onmousemove;

    return {
        ranOnce: false,
        tickCounter: 0,
        foodIndx: 0,
        isBotRunning: false,
        isBotEnabled: true,
        collisionPoint: {
            x: 0,
            y: 0,
            radius: 0
        },

        startBot: function() {
            if (window.autoRespawn && !window.playing && bot.isBotEnabled && bot.ranOnce && !bot.isBotRunning) {
                bot.connectBot();
            }
        },

        launchBot: function() {
            window.log('Starting Bot.');
            bot.isBotRunning = true;
            // Removed the onmousemove listener so we can move the snake manually by setting coordinates
            window.onmousemove = function() {};
        },

        // Stops the bot
        stopBot: function() {
            window.log('Stopping Bot.');
            window.setAcceleration(0);  // Disable the "sprint"
            bot.isBotRunning = false;
            // Re-enable the original onmousemove function
            window.onmousemove = original_onmousemove;
        },

        // Connects the bot
        connectBot: function() {
            if (!window.autoRespawn) return;
            bot.stopBot();  // Just in case
            window.log('Connecting...');
            window.connect();

            // Wait until we're playing to start the bot
            window.botCanStart = setInterval(function() {
                if (window.playing) {
                    bot.launchBot();
                    clearInterval(window.botCanStart);
                }
            }, 100);
        },

        forceConnect: function() {
            if (!window.connect) {
                return;
            }
            window.forcing = true;
            if (!window.bso) {
                window.bso = {};
            }
            window.currentIP = window.bso.ip + ":" + window.bso.po;
            var srv = window.currentIP.trim().split(":");
            window.bso.ip = srv[0];
            window.bso.po = srv[1];
            window.connect();
        },

        quickRespawn: function() {
            window.dead_mtm = 0;
            window.login_fr = 0;
            window.forceConnect();
        },

        changeSkin: function() {
            if (window.playing && window.snake !== null) {
                var skin = window.snake.rcv,
                    max = window.max_skin_cv || 27;
                skin++;
                if (skin > max) {
                    skin = 0;
                }
                window.setSkin(window.snake, skin);
            }
        },

        // Adjust goal direction
        changeGoalCoords: function(circle1) {
            if ((circle1.x != bot.collisionPoint.x || circle1.y != bot.collisionPoint.y)) {
                bot.collisionPoint = circle1;
                window.goalCoordinates = canvas.mapToMouse(window.snake.xx + (window.snake.xx - bot.collisionPoint.x), window.snake.yy + (window.snake.yy - bot.collisionPoint.y));
                window.setAcceleration(0);
                canvas.setMouseCoordinates(window.goalCoordinates[0], window.goalCoordinates[1]);
            }
        },

        // Sorting function for food, from property 'distance'
        sortFood: function(a, b) {
            return a.distance - b.distance;
        },

        // Sorting function for prey, from property 'distance'
        sortPrey: function(a, b) {
            return a.distance - b.distance;
        },

        // Checks to see if you are going to collide with anything in the collision detection radius
        checkCollision: function(x, y, r) {
            if (!window.collisionDetection) return false;
            var circle1 = canvas.collisionScreenToCanvas({
                x: x,
                y: y,
                radius: r
            });
            if (window.visualDebugging) {
                canvas.drawDot(circle1.x, circle1.y, circle1.radius, 'blue', false);
            }
            var shortest_distance = Number.MAX_VALUE;
            var avoid = false;
            var circle2;

            for (var snake in window.snakes) {
                if (window.snakes[snake].nk != window.snake.nk) {
                    for (y = window.snakes[snake].pts.length - 1; 0 <= y; y--) {
                        if (!window.snakes[snake].pts[y].dying) {
                            var xx = window.snakes[snake].pts[y].xx + window.snakes[snake].fx;
                            var yy = window.snakes[snake].pts[y].yy + window.snakes[snake].fy;
                            circle2 = {
                                x: xx,
                                y: yy,
                                radius: 15 * window.snakes[snake].sc * canvas.getScale()
                            };
                            if (canvas.circleIntersect(circle1, canvas.collisionScreenToCanvas(circle2))) {
                                var distance = canvas.getDistance(window.getX(), window.getY(), xx, yy);
                                if (distance < shortest_distance) {
                                    bot.changeGoalCoords(circle2);
                                    avoid = true;
                                    shortest_distance = distance;
                                }
                            }
                        }
                    }
                }
            }
            return avoid;
        },

        // Sort food based on distance
        getSortedFood: function() {
            // Filters the nearest food by getting the distance
            return window.foods.filter(function(val) {
                return val !== null && val !== undefined;
            }).map(canvas.getDistanceFromSnake).filter(function(val) {
                var isInsideDangerAngles = canvas.isInsideAngle(val, window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4);
                isInsideDangerAngles = isInsideDangerAngles || canvas.isInsideAngle(val, window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4);
                return !(isInsideDangerAngles && (val.distance <= 150));
            }).sort(bot.sortFood);
        },

        // Sort prey based on distance
        getSortedPrey: function() {
            // Filters the nearest food by getting the distance
            return window.preys.filter(function(val) {
                return val !== null;
            }).map(canvas.getDistanceFromSnake).sort(bot.sortPrey);
        },

        computeFoodGoal: function() {
            var sortedFood = bot.getSortedFood();

            var bestClusterIndx = 0;
            var bestClusterScore = 0;
            var bestClusterAbsScore = 0;
            var bestClusterX = 0;
            var bestClusterY = 0;

            // there is no need to view more points (for performance)
            var nIter = Math.min(sortedFood.length, 300);
            for (var i = 0; i < nIter; i += 2) {
                var clusterScore = 0;
                var clusterSize = 0;
                var clusterAbsScore = 0;
                var clusterSumX = 0;
                var clusterSumY = 0;

                var p1 = sortedFood[i];
                for (var j = 0; j < nIter; ++j) {
                    var p2 = sortedFood[j];
                    var dist = canvas.getDistance(p1.xx, p1.yy, p2.xx, p2.yy);
                    if (dist < 100) {
                        clusterScore += p2.sz;
                        clusterSumX += p2.xx * p2.sz;
                        clusterSumY += p2.yy * p2.sz;
                        clusterSize += 1;
                    }
                }
                clusterAbsScore = clusterScore;
                clusterScore /= Math.pow(p1.distance, 1.5);
                if (clusterSize > 2 && clusterScore > bestClusterScore) {
                    bestClusterScore = clusterScore;
                    bestClusterAbsScore = clusterAbsScore;
                    bestClusterX = clusterSumX / clusterAbsScore;
                    bestClusterY = clusterSumY / clusterAbsScore;
                    bestClusterIndx = i;
                }
            }

            window.currentFoodX = bestClusterX;
            window.currentFoodY = bestClusterY;

            // if see a large cluster then use acceleration
            if (bestClusterAbsScore > 50) {
                window.foodAcceleration = 1;
            } else {
                window.foodAcceleration = 0;
            }
        },

        // Defense mode - bot turns around in a circle
        playDefence: function(dir) {
            window.kd_l = (dir === 'l');
            window.kd_r = (dir === 'r');
            canvas.setMouseCoordinates(window.getWidth() / 2, window.getHeight() / 2);
        },

        // Called by the window loop, this is the main logic of the bot.
        thinkAboutGoals: function() {
            // If no enemies or obstacles, go after what you are going after
            if (!bot.checkCollision(window.getX(), window.getY(), window.getSnakeWidth() * window.collisionRadiusMultiplier)) {

                // Save CPU by only calculating every Nth frame
                bot.tickCounter++;
                if (bot.tickCounter > 25) {
                    bot.tickCounter = 0;

                    // Current food
                    bot.computeFoodGoal();

                    var coordinatesOfClosestFood = canvas.mapToMouse(window.currentFoodX, window.currentFoodY);
                    window.goalCoordinates = coordinatesOfClosestFood;
                    // Sprint
                    window.setAcceleration(window.foodAcceleration);
                    // Check for preys, enough "length"
                    if (window.preys.length > 0 && window.huntPrey) {
                        // Sort preys based on their distance relative to player's snake
                        window.sortedPrey = bot.getSortedPrey();
                        // Current prey
                        window.currentPrey = window.sortedPrey[0];
                        // Convert coordinates of the closest prey using mapToMouse
                        var coordinatesOfClosestPrey = canvas.mapToMouse(window.currentPrey.xx, window.currentPrey.yy);
                        // Check for the distance
                        if (window.currentPrey.distance <= Math.pow(window.getSnakeLength(), 2) / 2) {
                            // Set the mouse coordinates to the coordinates of the closest prey
                            window.goalCoordinates = coordinatesOfClosestPrey;
                            // "Sprint" enabled
                            window.setAcceleration(1);
                        }
                    }
                    window.kd_l = false;
                    window.kd_r = false;
                    canvas.setMouseCoordinates(window.goalCoordinates[0], window.goalCoordinates[1]);
                }
            }
        }
    };
})();

var userInterface = (function() {
    // Save the original slither.io functions so we can modify them, or reenable them later.
    var original_keydown = document.onkeydown;
    var original_onmouseDown = window.onmousedown;
    var original_oef = window.oef;

    return {
        // Save variable to local storage
        savePreference: function(item, value) {
            window.localStorage.setItem(item, value);
        },

        // Load a variable from local storage
        loadPreference: function(preference, defaultVar) {
            var savedItem = window.localStorage.getItem(preference);
            if (savedItem !== null) {
                if (savedItem == 'true') {
                    window[preference] = true;
                } else if (savedItem == 'false') {
                    window[preference] = false;
                } else {
                    window[preference] = savedItem;
                }
                window.log('Setting found for ' + preference + ': ' + window[preference]);
            } else {
                window[preference] = defaultVar;
                window.log('No setting found for ' + preference + '. Used default: ' + window[preference]);
            }
            return window[preference];
        },

        // Saves username when you click on "Play" button
        playButtonClickListener: function() {
            userInterface.saveNick();
            userInterface.loadPreference('autoRespawn', false);
        },

        // Preserve nickname
        saveNick: function() {
            var nick = document.getElementById('nick').value;
            userInterface.savePreference('savedNick', nick);
        },

        // Add interface elements to the page.
        // @param {string} id
        // @param {string} className
        // @param style
        appendDiv: function(id, className, style) {
            var div = document.createElement('div');
            if (id) div.id = id;
            if (className) div.className = className;
            if (style) div.style = style;
            document.body.appendChild(div);
        },

        // Store FPS data
        framesPerSecond: {
            startTime: 0,
            frameNumber: 0,
            filterStrength: 40,
            lastLoop: 0,
            frameTime: 0,
            getFPS: function() {
                var thisLoop = performance.now();
                var thisFrameTime = thisLoop - this.lastLoop;
                this.frameTime += (thisFrameTime - this.frameTime) / this.filterStrength;
                this.lastLoop = thisLoop;
                return (1000 / this.frameTime).toFixed(0);
            }
        },

        onkeydown: function(e) {
            // Original slither.io onkeydown function + whatever is under it
            original_keydown(e);
            if (document.activeElement.parentElement !== window.nick_holder) {
                // Letter `T` to toggle bot
                if (e.keyCode === 84) {
                    if (bot.isBotRunning) {
                        bot.stopBot();
                        bot.isBotEnabled = false;
                    } else {
                        bot.launchBot();
                        bot.isBotEnabled = true;
                    }
                }
                // Letter 'U' to toggle debugging (console)
                if (e.keyCode === 85) {
                    window.logDebugging = !window.logDebugging;
                    console.log('Log debugging set to: ' + window.logDebugging);
                    userInterface.savePreference('logDebugging', window.logDebugging);
                }
                // Letter 'Y' to toggle debugging (visual)
                if (e.keyCode === 89) {
                    window.visualDebugging = !window.visualDebugging;
                    console.log('Visual debugging set to: ' + window.visualDebugging);
                    userInterface.savePreference('visualDebugging', window.visualDebugging);
                }
                // Letter 'I' to toggle autorespawn
                if (e.keyCode === 73) {
                    window.autoRespawn = !window.autoRespawn;
                    console.log('Automatic Respawning set to: ' + window.autoRespawn);
                    userInterface.savePreference('autoRespawn', window.autoRespawn);
                }
                // Letter 'O' to set automatic mobile rendering
                if (e.keyCode === 79) {
                    canvas.toggleMobileRendering(!window.mobileRender);
                }
                // Letter 'M' to manually set mobile rendering
                if (e.keyCode === 77) {
                    canvas.toggleAutomaticMobileRendering();
                }
                // Letter 'P' to toggle hunting Prey
                if (e.keyCode === 80) {
                    window.huntPrey = !window.huntPrey;
                    console.log('Prey hunting set to: ' + window.huntPrey);
                    userInterface.savePreference('huntPrey', window.huntPrey);
                }
                // Letter 'C' to toggle Collision detection / enemy avoidance
                if (e.keyCode === 67) {
                    window.collisionDetection = !window.collisionDetection;
                    console.log('collisionDetection set to: ' + window.collisionDetection);
                    userInterface.savePreference('collisionDetection', window.collisionDetection);
                }
                // Letter 'A' to increase collision detection radius
                if (e.keyCode === 65) {
                    window.collisionRadiusMultiplier++;
                    console.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
                    userInterface.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
                }
                // Letter 'S' to decrease collision detection radius
                if (e.keyCode === 83) {
                    if (window.collisionRadiusMultiplier > 1) {
                        window.collisionRadiusMultiplier--;
                        console.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
                        userInterface.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
                    }
                }
                // Letter 'D' to toggle defence mode
                if (e.keyCode === 68) {
                    window.defence = !window.defence;
                    console.log('Defence set to: ' + window.defence);
                    userInterface.savePreference('defence', window.defence);
                }
                // Letter 'Z' to reset zoom
                if (e.keyCode === 90) {
                    canvas.resetZoom();
                }
                // Letter 'Q' to quit to main menu
                if (e.keyCode == 81) {
                    window.autoRespawn = false;
                    userInterface.quit();
                }
                // 'ESC' to quickly respawn
                if (e.keyCode == 27) {
                    bot.quickRespawn();
                }
                // Letter 'X' to change skin
                if (e.keyCode == 88) {
                    bot.changeSkin();
                }
                // Save nickname when you press "Enter"
                if (e.keyCode == 13) {
                    userInterface.saveNick();
                }
            }
        },

        onmousedown: function(e) {
            original_onmouseDown(e);
            e = e || window.event;
            if (window.playing) {
                switch (e.which) {
                    // "Left click" to manually speed up the slither
                    case 1:
                        window.setAcceleration(1);
                        window.log('Manual boost...');
                        break;
                        // "Right click" to toggle bot in addition to the letter "T"
                    case 3:
                        if (bot.isBotRunning) {
                            bot.stopBot();
                            bot.isBotEnabled = false;
                        } else {
                            bot.launchBot();
                            bot.isBotEnabled = true;
                        }
                        break;
                }
            }
        },

        onFrameUpdate: function() {
            // Botstatus overlay
            var generalStyle = '<span style = "opacity: 0.35";>';
            window.botstatus_overlay.innerHTML = generalStyle + '(T / Right Click) Bot: </span>' + userInterface.handleTextColor(bot.isBotRunning);
            window.visualdebugging_overlay.innerHTML = generalStyle + '(Y) Visual debugging: </span>' + userInterface.handleTextColor(window.visualDebugging);
            window.logdebugging_overlay.innerHTML = generalStyle + '(U) Log debugging: </span>' + userInterface.handleTextColor(window.logDebugging);
            window.autorespawn_overlay.innerHTML = generalStyle + '(I) Auto respawning: </span>' + userInterface.handleTextColor(window.autoRespawn);
            window.automobilerender_overlay.innerHTML = generalStyle + '(M) Auto mobile rendering: </span>' + userInterface.handleTextColor(window.autoMobileRender);
            window.rendermode_overlay.innerHTML = generalStyle + '(O) Mobile rendering: </span>' + userInterface.handleTextColor(window.mobileRender);
            window.huntprey_overlay.innerHTML = generalStyle + '(P) Prey hunting: </span>' + userInterface.handleTextColor(window.huntPrey);
            window.collision_detection_overlay.innerHTML = generalStyle + '(C) Collision detection: </span>' + userInterface.handleTextColor(window.collisionDetection);
            window.collision_radius_multiplier_overlay.innerHTML = generalStyle + '(A/S) Collision radius multiplier: ' + window.collisionRadiusMultiplier + ' </span>';
            window.defence_overlay.innerHTML = generalStyle + '(D) Defence: </span>' + userInterface.handleTextColor(window.defence);
            window.resetzoom_overlay.innerHTML = generalStyle + '(Z) Reset zoom </span>';
            window.scroll_overlay.innerHTML = generalStyle + '(Mouse Wheel) Zoom in/out </span>';
            window.quittomenu_overlay.innerHTML = generalStyle + '(Q) Quit to menu </span>';
            window.changeskin_overlay.innerHTML = generalStyle + '(X) Change skin </span>';
            window.quickResp_overlay.innerHTML = generalStyle + '(ESC) Quick Respawn </span>';
            window.fps_overlay.innerHTML = generalStyle + 'FPS: ' + userInterface.framesPerSecond.getFPS() + '</span>';

            if (window.position_overlay && window.playing) {
                // Display the X and Y of the snake
                window.position_overlay.innerHTML = generalStyle + 'X: ' + (Math.round(window.snake.xx) || 0) + ' Y: ' + (Math.round(window.snake.yy) || 0) + '</span>';
            }
            if (window.playing && window.ip_overlay) {
                window.ip_overlay.innerHTML = generalStyle + 'Server: ' + window.bso.ip + ':' + window.bso.po;
                '</span>';
            }
            if (window.playing && window.visualDebugging && bot.isBotRunning) {
                // Only draw the goal when a bot has a goal.
                if (window.goalCoordinates && window.goalCoordinates.length == 2) {
                    var drawGoalCoordinates = canvas.mouseToScreen(window.goalCoordinates[0], window.goalCoordinates[1]);
                    drawGoalCoordinates = canvas.screenToCanvas(drawGoalCoordinates[0], drawGoalCoordinates[1]);
                    canvas.drawLine(drawGoalCoordinates[0], drawGoalCoordinates[1], 'green');
                    canvas.drawDot(drawGoalCoordinates[0], drawGoalCoordinates[1], 5, 'red', true);
                    canvas.drawAngle(window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4, true);
                    canvas.drawAngle(window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4, true);
                }
            }
        },

        oef: function() {
            // Original slither.io oef function + whatever is under it
            // requestAnimationFrame(window.loop);
            original_oef();
            if (bot.isBotRunning) window.loop();
            userInterface.onFrameUpdate();
        },

        // Quit to menu
        quit: function() {
            if (window.playing && window.resetGame) {
                window.want_close_socket = true;
                window.dead_mtm = 0;
                if (window.play_btn) {
                    window.play_btn.setEnabled(true);
                }
                window.resetGame();
            }
        },

        // Update the relation between the screen and the canvas.
        onresize: function() {
            window.resize();
            // Canvas different size from the screen (often bigger).
            canvas.canvasRatio = [window.mc.width / window.getWidth(),
                                  window.mc.height / window.getHeight()];
        },

        handleTextColor: function(enabled) {
            return '<span style=\"opacity: 0.8; color:' + (enabled ? 'green;\">enabled' : 'red;\">disabled') + '</span>';
        }
    };
})();
window.play_btn.btnf.addEventListener('click', userInterface.playButtonClickListener);
document.onkeydown = userInterface.onkeydown;
window.onmousedown = userInterface.onmousedown;
window.oef = userInterface.oef;
window.onresize = userInterface.onresize;


// Loop for running the bot
window.loop = function() {
    // If the game and the bot are running
    if (window.playing && bot.isBotEnabled) {
        bot.ranOnce = true;
        // TODO: Check some condition to see if we should play defence
        // Right now this just uses the manual toggle
        if (window.defence) {
            bot.playDefence('l');
            return;
        }
        bot.thinkAboutGoals();
    } else {
        if (bot.ranOnce) {
            //window.startInterval = setInterval(bot.startBot, 1000);
            bot.stopBot();
        }
    }
};

// Main
(function() {
    // Target the user's browser.
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    // Load preferences
    userInterface.loadPreference('logDebugging', false);
    userInterface.loadPreference('visualDebugging', false);
    userInterface.loadPreference('autoRespawn', false);
    userInterface.loadPreference('mobileRender', false);
    userInterface.loadPreference('huntPrey', true);
    userInterface.loadPreference('collisionDetection', true);
    userInterface.loadPreference('collisionRadiusMultiplier', 8);
    userInterface.loadPreference('defence', false);
    userInterface.loadPreference('autoMobileRender', true);
    window.nick.value = userInterface.loadPreference('savedNick', 'Slithere.com Bot');

    // Overlays

    // Top left
    window.generalstyle = 'color: #FFF; font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; font-size: 14px; position: fixed; z-index: 7;';
    userInterface.appendDiv('botstatus_overlay', 'nsi', window.generalstyle + 'left: 30; top: 65px;');
    userInterface.appendDiv('visualdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 80px;');
    userInterface.appendDiv('logdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 95px;');
    userInterface.appendDiv('autorespawn_overlay', 'nsi', window.generalstyle + 'left: 30; top: 110px;');
    userInterface.appendDiv('rendermode_overlay', 'nsi', window.generalstyle + 'left: 30; top: 125px;');
    userInterface.appendDiv('automobilerender_overlay', 'nsi', window.generalstyle + 'left: 30; top: 140px;');
    userInterface.appendDiv('collision_detection_overlay', 'nsi', window.generalstyle + 'left: 30; top: 155px;');
    userInterface.appendDiv('collision_radius_multiplier_overlay', 'nsi', window.generalstyle + 'left: 30; top: 170px;');
    userInterface.appendDiv('huntprey_overlay', 'nsi', window.generalstyle + 'left: 30; top: 185px;');
    userInterface.appendDiv('defence_overlay', 'nsi', window.generalstyle + 'left: 30; top: 200px;');
    userInterface.appendDiv('resetzoom_overlay', 'nsi', window.generalstyle + 'left: 30; top: 215px;');
    userInterface.appendDiv('scroll_overlay', 'nsi', window.generalstyle + 'left: 30; top: 230px;');
    userInterface.appendDiv('quickResp_overlay', 'nsi', window.generalstyle + 'left: 30; top: 245px;');
    userInterface.appendDiv('changeskin_overlay', 'nsi', window.generalstyle + 'left: 30; top: 260px;');
    userInterface.appendDiv('quittomenu_overlay', 'nsi', window.generalstyle + 'left: 30; top: 275px;');

    // Bottom right
    userInterface.appendDiv('position_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 120px;');
    userInterface.appendDiv('ip_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 150px;');
    userInterface.appendDiv('fps_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 170px;');

    // Listener for mouse wheel scroll - used for setZoom function
    document.body.addEventListener('mousewheel', canvas.setZoom);
    document.body.addEventListener('DOMMouseScroll', canvas.setZoom);

    // Set render mode
    if (window.mobileRender) {
        canvas.setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
        window.render_mode = 1;
    } else {
        canvas.setBackground();
        window.render_mode = 2;
    }

    // Unblocks all skins without the need for FB sharing.
    window.localStorage.setItem('edttsg', '1');

    // Remove social
    window.social.remove();

    // Start!
    bot.launchBot();
    window.startInterval = setInterval(bot.startBot, 1000);
	
	function setMenu() {
        var login = document.getElementById("login");
        if (login) {
            var div = document.createElement("div");
            div.style.width = "700px";
            div.style.color = "#85f9ae";
            div.style.fontFamily = "'Arial'";
            div.style.fontSize = "13px";
            div.style.textAlign = "center";
            div.style.opacity = "2";
            div.style.margin = "0 auto";
            div.style.padding = "5px 0";
            div.style.lineHeight = "18px";
		    login.appendChild(div);
            var stmenu = document.createElement("div");
            stmenu.style.width = "400px";
            stmenu.style.color = "#8058D0";            
            stmenu.style.borderRadius = "4px";
            stmenu.style.fontFamily = "'Arial'";
            stmenu.style.fontSize = "14px";
            stmenu.style.textAlign = "center";
            stmenu.style.margin = "0 auto 100px auto";
            stmenu.style.padding = "0 14px";
            stmenu.innerHTML = "Here is the best bot hacks <a style='color:#8058D0;' target='_blank' href='http://www.slithere.com'>Slithere.com [CLICK LOOK]</a>";
            login.appendChild(stmenu);
            stmenu.appendChild(div);
			stmenu.innerHTML += '<a href="http://www.slithere.com" target="_blank" style="color:#00cbea;opacity:2;text-decoration:none;">MOD from: www.Slithere.com </a> | <a href="http://www.agarw.com" target="_blank" style="color:#85f9ae;opacity:2;text-decoration:none;">PVP from: www.AgarW.com </a>'; 
    }
	}
setMenu();
})();

