// ==UserScript==
// @name        Slither.io Hilesi (By Ibrahim HAKKI)
// @namespace   slitherioautorespawn
// @description Zoom-Server Secimi-Skin Degistirici-Arkaplan Ve Daha Fazlasi!
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
