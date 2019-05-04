// ==UserScript==
// @name        KaKo ™ © [[GrozaVlogs]]
// @namespace    KaKo ™ © [[GrozaVIProst]]
// @version      5.0       [[Free]]
// @description  KAKOBOTS by kako
// @author       KAKO
// @match     http://kakobots.esy.es/
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
// @grant        none
// @run-at       document-start
// ==/UserScript==
//este script posee copyright toda copia de este script sera dado de baja automaticamente!
// this script is copyrighted every copy of this script will be automatically removed!
 
setTimeout(function() {
    window.__WebSocket = window.WebSocket;
    window.fakeWebSocket = function(){return {readyState: 0}};
    window._WebSocket = window.WebSocket = function(ip){return new window.fakeWebSocket(ip);};
    window.__botclonsData = {};
    window.__botclonsData.mx = 0;
    window.__botclonsData.my = 0;
    window.__botclonsData.socketaddr = null;
    window.addEventListener("load",function(){
        // код инжектинга
        if(!window.OldSocket)
        OldSocket = window.__WebSocket;
        window._WebSocket = window.WebSocket = window.fakeWebSocket = function(ip){
        var ws = new OldSocket(ip);
        ws.binaryType="arraybuffer"
        var fakeWS = {};
        for(var i in ws)
            fakeWS[i] = ws[i];
        fakeWS.send = function(){
       
        var msg = new DataView(arguments[0]);
        if(msg.byteLength==21){ // Most clones
            if(msg.getInt8(0, true) == 16){
                window.__botclonsData.mx = msg.getFloat64(1, true);
                window.__botclonsData.my = msg.getFloat64(9, true);
                window.__botclonsData.ml = msg.byteLength;
            }
        } else {
            if(msg.byteLength==13){
            if(msg.getUint8(0, true) == 16){
                window.__botclonsData.mx = msg.getInt32(1, true);
                window.__botclonsData.my = msg.getInt32(5, true);
                window.__botclonsData.ml = msg.byteLength;
            }else{
                if(msg.byteLength>4){ //
            if(msg.getUint8(0, true) == 16){
                window.__botclonsData.mx = msg.getInt16(1, true);
                window.__botclonsData.my = msg.getInt16(3, true);
                window.__botclonsData.ml = msg.byteLength;
            }
                }
            }
            }
        }
        return ws.send.apply(ws, arguments);
        };
        ws.onmessage = function(){
       
        fakeWS.onmessage && fakeWS.onmessage.apply(ws, arguments);
        };
        ws.onopen = function(){
        window.__botclonsData.socketaddr = ws.url;
       
        fakeWS.readyState = 1;
        fakeWS.onopen.apply(ws, arguments);
        };
        ws.onclose = function(){
        fakeWS.onclose.apply(ws, arguments);
        };
        return fakeWS;
        }
    })
    var real_minx = -7071;
    var real_miny = -7071;
    var real_maxx = 7071;
    var real_maxy = 7071;
    var lastsent = {
        minx: 0,
        miny: 0,
        maxx: 0,
        maxy: 0
    };
   
   
 
    function valcompare(Y, Z) {
        return 0.01 > Y - Z && -0.01 < Y - Z
    }
    var socket = io.connect('ws://127.0.0.1:8081');
    var canMove = true;
    var movetoMouse = true;
    var moveEvent = new Array(2);
    var canvas = document.getElementById("canvas");
    last_transmited_game_server = null;
    socket.on('force-login', function(data) {
        socket.emit("login", {
            "uuid": client_uuid,
            "type": "client"
        });
        transmit_game_server()
    });
   
   $( "#canvas" ).after( "<div style='background-color: rgba(128, 128, 128, 0.07); -moz-opacity: 0.4; -khtml-opacity: 0.4; opacity: 1.0; border-radius: 15px 15px 15px 15px; filter: alpha(opacity=100); zoom: 1; width: 205px; top: 300px; left: 1150px; display: block; position: absolute; text-align: center; font-size: 15px; color: #951eff; padding: 5px; font-family: Ubuntu;'> <div style='color:#44ff2f; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=500); padding: 20px;'><b>KAKOBOTS.ML</b></div> <div style='color:#951eff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;'><br>KAKOBOTS : <a id='minionCount' >Offline</a> </div> <div style='color:#951eff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;'><br><a>A</a> - Move To Mouse: <a id='ismoveToMouse' >On</a> </div> <div style='color:#951eff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;'><br><a>D</a> - Stop Movement: <a id='isStopMove' >Off</a> </div> <a><br>E</a> - Split bots <a><br>R</a> - Eject mass" );
   socket.on('spawn-count', function(data) {
        document.getElementById('minionCount').innerHTML = data
    });
    var client_uuid = localStorage.getItem('client_uuid');
    if (client_uuid == null) {
        console.log("generating a uuid for this user");
        client_uuid = ""; var ranStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var ii = 0; ii < 15; ii++) client_uuid += ranStr.charAt(Math.floor(Math.random() * ranStr.length));
        localStorage.setItem('client_uuid', client_uuid)
    }
    socket.emit("login", client_uuid);
    $(" #instructions").replaceWith('<br><div class="input-group"><span class="input-group-addon" id="basic-addon1">UUID</span><input type="text" value="' + client_uuid + '" readonly class="form-control"</div>');
 
    function isMe(cell) {
        for (var i = 0; i < window.agar.myCells.length; i++) {
            if (window.agar.myCells[i] == cell.id) {
                return true
            }
        }
        return false
    }
 
    function getCell() {
        var me = [];
        for (var key in window.agar.allCells) {
            var cell = window.agar.allCells[key];
            if (isMe(cell)) {
                me.push(cell)
            }
        }
        return me[0]
    }
    var skin_var = 0;
 
    function emitPosition() {
        socket.emit("pos", {
            "x": window.__botclonsData.mx,
            "y": window.__botclonsData.my,
            "l": window.__botclonsData.ml,
            "dimensions": [-7071, -7071, 7071, 7071]
        })
    }
   
 
    function emitSplit() {
        socket.emit("cmd", {
            "name": "split"
        })
    }
 
    function emitMassEject() {
        socket.emit("cmd", {
            "name": "eject"
        })
    }
 
    function toggleMovement() {
        canMove = !canMove;
        switch (canMove) {
            case true:
                canvas.onmousemove = moveEvent[0];
                moveEvent[0] = null;
                canvas.onmousedown = moveEvent[1];
                moveEvent[1] = null;
                break;
            case false:
                canvas.onmousemove({
                    clientX: innerWidth / 2,
                    clientY: innerHeight / 2
                });
                moveEvent[0] = canvas.onmousemove;
                canvas.onmousemove = null;
                moveEvent[1] = canvas.onmousedown;
                canvas.onmousedown = null;
                break
        }
    }
    interval_id = setInterval(function() {
        emitPosition()
    }, 100);
    interval_id2 = setInterval(function() {
        transmit_game_server_if_changed()
    }, 5000);
    document.addEventListener('keydown', function(e) {
        var key = e.keyCode || e.which;
        switch (key) {
            case 65:
                movetoMouse = !movetoMouse;
                if(movetoMouse) { document.getElementById('ismoveToMouse').innerHTML = "On"; } else { document.getElementById('ismoveToMouse').innerHTML = "Off"; }
                break;
            case 68:
                toggleMovement();
                if(!canMove) { document.getElementById('isStopMove').innerHTML = "On"; } else { document.getElementById('isStopMove').innerHTML = "Off"; }
                break;
            case 69:
                emitSplit();
                break;
            case 82:
                emitMassEject();
                break
        }
    });
 
    function transmit_game_server_if_changed() {
        if (last_transmited_game_server != window.__botclonsData.socketaddr) {
            transmit_game_server()
        }
    }
 
    function transmit_game_server() {
        last_transmited_game_server = window.__botclonsData.socketaddr;
        socket.emit("cmd", {
            "name": "connect_server",
            "ip": window.__botclonsData.socketaddr,
            "origin": location.origin
        })
    }
    var mouseX = 0;
    var mouseY = 0;
    $("body").mousemove(function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY
    });
}, 200)