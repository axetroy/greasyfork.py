// ==UserScript==
// @name        Diep.io rMod (evergreen)
// @namespace   diepiormod
// @description Auto Respawn + Autofire + Dark Theme + Team Changer + Kill Counter + Class Tree + MORE!
// @version     50
// @author      condoriano
// @icon        http://i.imgur.com/T074JpV.png
// @include     http://diep.io/*
// @include     https://diep.io/*
// @connect     greasyfork.org
// @connect     diep.io
// @run-at      document-start
// @grant       none
// ==/UserScript==

var script = document.createElement('script');
script.src = 'https://greasyfork.org/scripts/22243-diepiomod/code/diepiomod.js'
document.head.appendChild(script);
