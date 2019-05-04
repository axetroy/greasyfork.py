// ==UserScript==
// @name          Nexus Mods no more ad blocker warnings
// @namespace     https://www.nexusmods.com
// @description   Removes ad blocker warnings that appear when using script / ad blockers
// @version       1
// @author        samhain6
// @include       http://www.nexusmods.com/*
// @include       https://www.nexusmods.com/*
// ==/UserScript==

var areplacer = document.getElementsByClassName("areplacer");
var count = areplacer.length;
var i;

for(i = 0;i < count;i++)
{
areplacer[0].parentNode.removeChild(areplacer[0]);
}