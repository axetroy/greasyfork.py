// ==UserScript==
// @name         Bots Blobe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       REF
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

//PRESS "I" FOR INFORMATIONS
window.sockets = [];
function init() {
    
    window.unlockSkins();
    if (localStorage.getItem("Discord")) {
            function newSocket(botName) {
        $.get("/getIP", {
            sip: lobbyURLIP
        }, function(data) {
            window.socketBot = io.connect("http://" + data.ip + ":" + data.port, {
                "connect timeout": 3000,
                reconnection: true,
                query: "cid=" + UTILS.getUniqueID() + "&rmid=" + lobbyRoomID
            });
            window.sockets.push(window.socketBot);
            spawnBot(botName);
        });
    }

    function BotAmout(number, botName) {
        for (var i = 0; i < number; i++) {
            newSocket(botName);
        }
    }

    function spawnBot(nameBot) {
        window.sockets.forEach(socket => {
            socket.emit("spawn", {
                name: nameBot + "_" + Math.floor(Math.random() * 10000) + 1,
                skin: 0
            });
        });
    }

    function sendChatMessage(str) {
        if (!window.sockets) return alert("no sockets");
        window.sockets.forEach(socket => {
            socket.emit("ch", str);
        });
    }

    function socketClose() {
        if (!window.sockets) return alert("no sockets");
        window.sockets.forEach(socket => {
            socket.close();
        });
    }

    function generateRandomBlocks() {
        for (i = -2.965; i <= 3.14; i += 0.3488) {
            socket.emit("1", i, 243.85, 3);
        }
        for (i = -3.14; i <= 3.14; i += 0.3488) {
            socket.emit("1", i, 194, 2);
        }
        for (i = -3.14; i < 3.14; i += 0.216) {
            socket.emit("1", i, 1e3, 1);
        }
        if (!window.sockets) return alert("no sockets");
        window.sockets.forEach(socket => {
            for (i = -2.965; i <= 3.14; i += 0.3488) {
                socket.emit("1", i, 243.85, 3);
            }
            for (i = -3.14; i <= 3.14; i += 0.3488) {
                socket.emit("1", i, 194, 2);
            }
            for (i = -3.14; i < 3.14; i += 0.216) {
                socket.emit("1", i, 1e3, 1);
            }
        });
    }

    addEventListener("keydown", function(ev) {
        if (ev.keyCode == 76) { //L
            var x = prompt("Bots say...");
            sendChatMessage(x);
        }
        if (ev.keyCode == 80) { //P
            socketClose();
            window.sockets = [];
            alert("Bots Stopped...");
        }
        if (ev.keyCode == 77) { //M
            var xy = parseInt(prompt("Bots amout..."));
            var name = prompt("Bots name...");
            BotAmout(xy, name);
            alert("Bots start...");
        }
        if (ev.keyCode == 73) { //M
            alert("L: send chat message\nP: stop bots\nM: spawn bots amout\nQ: Generate random objects\nBots Running: " + window.sockets.length);
        }
        if (ev.keyCode == 81) {
            generateRandomBlocks();
        }
    });

    addEventListener("mousewheel", function(a) {
        a = window.event || a;
        a.preventDefault();
        a.stopPropagation();
        window.scroll = Math.max(-1, Math.min(1, a.wheelDelta || -a.detail))
        if (window.scroll == -1) {
            if (maxScreenHeight < 30000) {
                (maxScreenHeight += 250, maxScreenWidth += 250, resize(true));
                window.scroll = 0
            }
        }

        if (window.scroll == 1) {
            if (maxScreenHeight > 1080) {
                (maxScreenHeight -= 250, maxScreenWidth -= 250, resize(true))
                window.scroll = 0
            }
        }
    });

    setInterval(updatePlayer, 90000);

    function updatePlayer() {
        socket.emit("2", 0, 0);
        socket.emit("2", Math.round(camX), Math.round(camY));
    }
    } else {
        window.base64 = ["aHR0cHM6Ly9kaXNjb3JkLmdnLzlYTndTV3A="];
        window.open(atob(base64));
        localStorage.setItem("Discord", "Si");
    }
}

init();