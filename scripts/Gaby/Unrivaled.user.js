// ==UserScript==
// @name Unrivaled
// @namespace http://meuxly.com/
// @version 1.0.1
// @description Veterans Agar Clan Extension Edited by Meux
// @author Szymy and Gaby
// @match http://agar.io/*
// @downloadUrl http://meuxly.com/vetx/install.user.js
// @updateUrl http://meuxly.com/vetx/install.user.js
// @run-at document-start
// @grant GM_xmlhttpRequest
// @connect meuxly.com
// ==/UserScript==

// © 2018 meuxly.com

// Check location
if (location.host === "agar.io" && location.pathname === "/") {
location.href = "http://agar.io/Unrivaled" + location.hash;
return;
}

// Inject script
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
method : "GET",
url : "http://meuxly.com/vetx/",
onload : function(e) {
document.open();
document.write(e.responseText);
document.close();
}
});

var interval = setInterval( function () {
if ('undefined' == typeof unsafeWindow.jQuery) {
//console.log("jQuery NOT loaded!");
} else {
clearInterval( interval );
console.log("jQuery loaded!");

var config = {};
config.pass = 'MyRandomServerPass123';
config.socket = {
host: '206.189.104.203',
port: '2222'
};

var socket = io('http://' + config.socket.host + ':' + config.socket.port, {query: 'pass=' + config.pass});

socket.on('connect', function () {
console.debug('CONNECTED');
});

socket.on('requestData', function () {
socket.emit('Data', {uname: $('#nick').val(),
team: $('#clantag').val(),
lb: $('#leaderboard-positions').html(),
server: $('#server-ws').val(),
region: $('#region').val(),
mode: $('#gamemode').val(),
party: $('#party-token').val()
});
});
socket.on('split', function () {
$("body").trigger(key("keydown", " "));
$("body").trigger(key("keyup", " "));
});
socket.on('eject', function () {
$("body").trigger(key("keydown", "W"));
$("body").trigger(key("keyup", "W"));
});
}
}, 2000);