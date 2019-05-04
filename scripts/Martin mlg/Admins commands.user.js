// ==UserScript==
// @name         Admins commands
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  for admins only
// @author       Martin
// @match        http://wair.io/*
// @grant        none
// ==/UserScript==
// remove ads   :V
$("#player").remove();
$("#ytPanel").remove();
$("#adflyads").remove();
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '49') {
  chattxt="/mass1 245";
  sendChat(chattxt);  // mass up key is one 
    }
    else if (e.keyCode == '50') {
        chattxt="/mass_ 3";
	sendChat(chattxt);
        // mass down key is 2
    }
    else if (e.keyCode == '51') {
        chattxt="/spawn food 1000";
        sendChat(chattxt);
       // food spawn key is 3
    }
    else if (e.keyCode == '52') {
        chattxt="/merge";
        sendChat(chattxt);
       // merge  key is 4
    }
      else if (e.keyCode == '53') {
        chattxt="/tp";
        sendChat(chattxt);
       // teleport  key is 5
    }
      else if (e.keyCode == '54') {
        chattxt="/spawn virus 100";
	    sendChat(chattxt);
       // spawn virus key is 6
    }
     else if (e.keyCode == '48') {
        chattxt="/color";
	    sendChat(chattxt);
       // change color randomly key is 0
    }
     
}
// adding hotkey to contorl bots @!#!@# 
window.__WebSocket = window.WebSocket;
window._WebSocket = window.WebSocket = function(ip) {
    return new window.fakeWebSocket(ip);
};
window.key = {
    e: false,
    r: false,
    t: false,
    p: false
};
window.addEventListener("load", function() {
    OldSocket = window.__WebSocket;
    window.WebSocket = window.fakeWebSocket = function(ip) {
        var fakeWS = {};
        var ws = new OldSocket(ip);
        ws.binaryType = "arraybuffer";
        for (var i in ws) fakeWS[i] = ws[i];
        fakeWS.send = function() {
            if (window.key.e){
                arguments[0] = new Int8Array(1);
                arguments[0][0] = 22;
            } else if (window.key.r){
                arguments[0] = new Int8Array(1);
                arguments[0][0] = 23;
            } else if (window.key.t){
                arguments[0] = new Int8Array(1);
                arguments[0][0] = 24;
            } else if (window.key.p) {
                arguments[0] = new Int8Array(1);
                arguments[0][0] = 25;
            }
            window.key = {};
            return ws.send.apply(ws, arguments);
        };
        ws.onmessage = function() {
            fakeWS.onmessage && fakeWS.onmessage.apply(ws, arguments);
        };
        ws.onopen = function() {
            fakeWS.readyState = 1;
            fakeWS.onopen.apply(ws, arguments);
        };
        return fakeWS;
    };
});
document.addEventListener('keydown', function(e) {
    if (e.keyCode == 69) window.key.e = true;
    if (e.keyCode == 82) window.key.r = true;
    if (e.keyCode == 84) window.key.t = true;
    if (e.keyCode == 80) window.key.p = true;
});