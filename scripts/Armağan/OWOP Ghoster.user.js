// ==UserScript==
// @name         OWOP Ghoster
// @namespace    *.ourworldofpixels.com/*
// @version      0.1
// @description  Everywhere Ghost!
// @author       Armağan
// @match        *.ourworldofpixels.com/*
// @grant        none
// ==/UserScript==
var X = window.prompt("X Kordinatı","0");
var Y = window.prompt("Y Kordinatı","0");
var interval = window.prompt("Aralık Kaç Olsun\nMS tipinden.\n1000 = 1 Saniye","255");
setInterval(function(){
OWOP.world.setPixel(X, Y, [0, 0, 0]);
OWOP.world.setPixel(X, Y, [255, 255, 255]);
},interval);
