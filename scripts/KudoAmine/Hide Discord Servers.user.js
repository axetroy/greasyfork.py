// ==UserScript==
// @name        Hide Discord Servers
// @description Hide Servers You Only Joined Them For Global Emotes :)
// @version     1.0
// @author      KudoAmine
// @namespace   http://tampermonkey.net/
// @match       *://discordapp.com/*
// @run-at       document-idle

// ==/UserScript==

// Add Server's Name or ID below | Format: ServersToHide = ["ServerName1","ServerName2","ServerName3",...];

var ServersToHide = ["AServerName","1234567890"];

function JustWait() {
var guilds = document.getElementsByClassName("guild-1EfMGQ");
if (guilds.length>1){
HideServers ()
  } else {
setTimeout(function(){
    JustWait()
}, 2000);
}
}

function HideServers () {
var guilds = document.getElementsByClassName("guild-1EfMGQ");
var i,j;
for (j=0;j<ServersToHide.length;j++){
for (i=1;i<guilds.length - 1;i++){
if(guilds[i].innerHTML.indexOf(ServersToHide[j])!=-1){
guilds[i].style.display="none";
}
}
}
}

JustWait()