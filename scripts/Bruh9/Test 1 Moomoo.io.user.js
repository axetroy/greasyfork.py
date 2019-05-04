// ==UserScript==
// @name         Test 1 Moomoo.io
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Bot Hack
// @author       Bruh9
// @match        http://moomoo.io/*
// @grant        none
// ==/UserScript==

setInterval(function(){ 
    setTimeout(enterGame(1), 2);
}, 10);

setInterval(function(){ 
    sendJoin(1);
}, 6000);

setInterval(function(){ 
    window.io.managers[Object.keys(this.io.managers)[0]].nsps["/"].emit("3", "d", 1);
}, 6000);

setInterval(function(){ 
    document.getElementById("nameInput").value = 'iamawesomelol3;
}, 1000);

setInterval(function(){ 
    window.io.managers[Object.keys(this.io.managers)[0]].nsps["/"].emit("3", "r", 1);
}, 6000);

setInterval(function(){ 
    window.io.managers[Object.keys(this.io.managers)[0]].nsps["/"].emit("4", '1');
}, 5000);

setInterval(function(){ 
    window.io.managers[Object.keys(this.io.managers)[0]].nsps["/"].emit("ch", 'iamawesomelol3');
}, 5000);

var element = document.getElementById("gameName");
element.parentNode.removeChild(element);

var element = document.getElementById("menuContainer");
element.parentNode.removeChild(element);

var element = document.getElementById("loadingText");
element.parentNode.removeChild(element);

var element = document.getElementById("mainMenu");
element.parentNode.removeChild(element);