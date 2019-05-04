// ==UserScript==
// @name         matteoki dark mode (Darkmode)
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Pressing [W] spawns in Fishing Boats! (Darkmode is HighNoon643's code!)
// @author       __JaZzY!
// @match        http://doblons.io/*
// @grant        none
// ==/UserScript==

// darkmode for doblons

var headAppend = document.getElementsByTagName("head")[0],
    style = document.createElement("div");
style.innerHTML = "<style>.dark:hover {background-color: rgba(80, 80, 80, 0.5);}.dark{pointer-events: auto;cursor: pointer;display: inline-block;position: absolute;bottom: 10px;left: 164px;padding: 4px;background-color: rgba(40, 40, 40, 0.5);font-family: regularF;font-size: 20px;border-radius: 4px;color: #fff;}</style>", headAppend.appendChild(style);
var menuAppend = document.getElementById("weaponsContainer"),
    darkMode = document.createElement("div");
darkMode.innerHTML = "<div id='darkMode' class='dark' onclick='makeDark();'>Darkmode</div>", menuAppend.appendChild(darkMode), window.makeDark = function() {
    gameData.outerColor = "#1E1F1F", gameData.waterColor = "#111111", darkMode.innerHTML = "<div id='darkMode'class='dark' onclick='makeLight();'>Lightmode</div>"
}, window.makeLight = function() {
    gameData.waterColor = "#acb5db", gameData.outerColor = "#98a0c2", darkMode.innerHTML = "<div id='darkMode'class='dark' onclick='makeDark();'>Darkmode</div>"
};

