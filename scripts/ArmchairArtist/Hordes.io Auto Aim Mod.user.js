// ==UserScript==
// @name         Hordes.io Auto Aim Mod
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hordes.io Auto Aim Mod - Beta.
// @author       You
// @match        Hordes.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})(); var playersNear = [];
var ws;
var id;
var f = 0;
var user;
var canvas = document.querySelector("#gameCanvas");
var currentTarget;
var state = EnumStates.BOTH;

function Player(id, x, y, tribe){
    this.id = id;
    this.x = x;
    this.y = y;
    this.tribe = tribe;
}
Player.prototype.getAngle = function(){
    return Math.atan2(this.deltaY, this.deltaX);
};

Player.prototype.getDistance = function(){
    return Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2));
};

function lookAtPointRelativeToCharacter(x, y){
    var centerX = innerWidth / 2;
    var centerY = innerHeight / 2;
    canvas.dispatchEvent(new MouseEvent("mousemove", {
        clientX: centerX + x,
        clientY: centerY + y
    }));
}

WebSocket.prototype.oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(m){
    var parsed = parseWSMsg(m);
    this.oldSend(currentTarget && parsed[0] === "2" ? "42[\"2\"," + currentTarget.getAngle() + "]" : m);
    if (!ws){
        ws = this;
        socketFound(this);
    }
};

function socketFound(socket){
    console.log("found socket object");
    socket.addEventListener('message', function(e){
        handleMessage(e);
    });
}

function handleMessage(e){
    var m = e.data;
    //console.log(m);
    var parsed = parseWSMsg(m);
    if (parsed[0] === "3"){ //position update
        playersNear = [];
        var data = parsed[1];
        for (var i = 0; i < data.length ; i += 12) { //loop to assign chunks of the array to a player
            var playerData = data.slice(i, i + 12);
            var player = new Player(playerData[0], playerData[1], playerData[2], playerData[7]);
            //console.log(player.id,player.x,player.y);
            if (player.id !== id) playersNear.push(player);
            else user = player;
        }
        if (currentTarget) currentTarget = null; //reset it, it'll be updated soon
        if ((state === EnumStates.AIM || state === EnumStates.BOTH) && playersNear.length > 0){
            var closestPlayer = getClosestPlayer();
            if (closestPlayer.getDistance() < 200 && (closestPlayer.tribe !== user.tribe || user.tribe === null)) aimAt(closestPlayer);
        }
    }
    if (parsed[0] === "1" && !id){
        id = parsed[1];
        console.log("id found: " + id);
    }
    if (parsed[0] === "10" && parsed[1] === id && parsed[2] !== 100 && (state === EnumStates.HEAL || state === EnumStates.BOTH)){
        heal();
    }
}

function aimAt(target){
    lookAtPointRelativeToCharacter(target.deltaX, target.deltaY);
    currentTarget = target;
}

function getClosestPlayer(){
    var closestPlayer;
    for (var i = 0 ; i < playersNear.length; i++){
        var currentPlayer = playersNear[i];
        currentPlayer.deltaX = currentPlayer.x - user.x;
        currentPlayer.deltaY = currentPlayer.y - user.y;
        if (i === 0 || currentPlayer.getDistance() < closestPlayer.getDistance()){
            closestPlayer = currentPlayer;
        }
    }
    return closestPlayer;
}

function parseWSMsg(s){
    if (s.indexOf("42") === -1) return -1;
    var o = s.substring(s.indexOf("["));
    return JSON.parse(o);
}