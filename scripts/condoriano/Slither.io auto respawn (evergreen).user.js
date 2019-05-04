// ==UserScript==
// @name        Slither.io auto respawn (evergreen)
// @namespace   slitherioautorespawn
// @description Auto Respawn + Server Selector + Skin Rotator + Unlimited Zoom + No Skin + No BG + Reduce Lag + More!
// @version     2.2
// @author      condoriano
// @icon        http://i.imgur.com/6NJONsZ.png
// @include     http://slither.io/*
// @include     https://slither.io/*
// @grant       none
// ==/UserScript==

var script = document.createElement('script');
script.src = document.location.protocol+"//greasyfork.org/scripts/20966-slitheriomod/code/slitheriomod.js";
(document.body || document.head || document.documentElement).appendChild(script);
