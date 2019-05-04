// ==UserScript==
// @name         sketchfab.com - Remove gamepads support
// @namespace    x4fab_sffixed
// @version      0.1
// @description  Removes gamepads support because it's broken
// @author       x4fab
// @match        https://sketchfab.com/*
// @grant        none
// @license      CC0
// ==/UserScript==

navigator.getGamepads = function (){ return [] };
navigator.webkitGetGamepads = function (){ return [] };
