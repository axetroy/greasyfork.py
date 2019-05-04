// ==UserScript==
// @name         Diep2.io Chat System
// @namespace    http://discord.gg/BwqMNRn
// @version      0.3
// @description  Adds a chat system to diep2.io.
// @author       Lucario
// @match        *://139.162.69.30*
// @match        *://172.104.9.164*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js
// ==/UserScript==

const url = "https://diep2-chat.glitch.me/";

var socket = url ? io.connect(url) : null;

var link = document.createElement('a');
link.setAttribute('href', window.location);
var group = link.port;
link = null;

var socketConnectInterval = null;

var messages = ["", "", "", "", ""];

function socketConnect(){
    if (socket == null){
        socket = url ? io.connect(url) : null;
    }
    if (socket != null){
        clearInterval(socketConnectInterval);
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

if (url){
    socketConnectInterval = setInterval(socketConnect, 2500);
}

var rowHeight = 8;
var chatDisplay =
`<table id="chatDisplay" style="table-layout:fixed;position:absolute;top:25vh;left:5vh;display:block;color:#FF6600;width:25vw;height:40vh;pointer-events:none;">
<tr style="background-color:rgba(128, 128, 128, 0.3);"><td><div id="chat_0" style="height:${rowHeight}vh;width:25vw;font-size:16pt;overflow:hidden;word-wrap:break-word;pointer-events:none;"></div></td></tr>
<tr style="background-color:rgba(128, 128, 128, 0.3);"><td><div id="chat_1" style="height:${rowHeight}vh;width:25vw;font-size:16pt;overflow:hidden;word-wrap:break-word;pointer-events:none;"></div></td></tr>
<tr style="background-color:rgba(128, 128, 128, 0.3);"><td><div id="chat_2" style="height:${rowHeight}vh;width:25vw;font-size:16pt;overflow:hidden;word-wrap:break-word;pointer-events:none;"></div></td></tr>
<tr style="background-color:rgba(128, 128, 128, 0.3);"><td><div id="chat_3" style="height:${rowHeight}vh;width:25vw;font-size:16pt;overflow:hidden;word-wrap:break-word;pointer-events:none;"></div></td></tr>
<tr style="background-color:rgba(128, 128, 128, 0.3);"><td><div id="chat_4" style="height:${rowHeight}vh;width:25vw;font-size:16pt;overflow:hidden;word-wrap:break-word;pointer-events:none;"></div></td></tr>
</table>`;

document.getElementById("startMenuWrapper").insertAdjacentHTML('afterend', chatDisplay);

var chatInput =`<input id="chatInput" type="text" style="position:absolute;top:5vh;left:5vw;display:none;font-size:3vh;color:#FF6600;width:90vw;"></input>`;

document.getElementById("startMenuWrapper").insertAdjacentHTML('afterend', chatInput);

socket && socket.on("connect", () => {
    socket.on("message", (data) => {
        if (group !== null && data.target == group){
            messages.shift();
            messages.push(data.message);
            for (var i = 0; i < 5; i++){
                document.getElementById(`chat_${i}`).innerHTML = messages[i];
            }
        }
    });
    socket.once("disconnect", () => {
        socket.off("message");
        socket = null;
        socketConnectInterval = setInterval(socketConnect, 2500);
    });
});

document.getElementById("chatInput").addEventListener("keyup", (event) => {
    if (event.keyCode == 13){
        var textbox = document.getElementById("chatInput").value;
        socket && socket.emit("sendMessage", {target: group, message: document.getElementById("playerNameInput").value + ": " + textbox});
        document.getElementById("chatInput").value = "";
    }
});

document.addEventListener('keydown', function(event){
    if (event.keyCode == 36){
        var a = document.getElementById("chatInput");
        if (a){
            a.style.display == "none" ? ((a.style.display = "block"), document.getElementById("chatInput").focus()) : (document.getElementsByTagName("canvas")[0].focus(), (a.style.display = "none"));
        }
    }
});