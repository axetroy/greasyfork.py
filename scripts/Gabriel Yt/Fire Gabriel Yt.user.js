// ==UserScript==
// @name         Fire Gabriel Yt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  By Gabriel yt 
// @author       Zao
// @match        http://dual-agar.me/*
// @match        http://agar.io/*
// @match        http://dual-agar.online/*
// @match        http://gota.io/web/*
// @match        http://gaver.io/
// @grant        none
// ==/UserScript==

// Suscribete a Gabriel Yt :v

! function(c) {
    var host = "agar.io"; // Anti Moneyclip :V
    if (location.host == host) {
        location.href = "http://dual-agar.me/";
        return;
    }