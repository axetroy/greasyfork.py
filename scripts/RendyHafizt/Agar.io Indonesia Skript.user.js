// ==UserScript==
// @name         Agar.io Indonesia Skript
// @namespace	 AgarioMods
// @version      1.9.9
// @description  Script ini untuk komunitas Agar.io Indonesia
// @author       Rendy Hafizt 
// @match        http://agar.io/
// @match        http://agar.io/#*
// @match        http://agar.io/?*
// @grant        none
// ==/UserScript==

var script = document.createElement('script');
script.src = document.location.protocol+"//agariomods.com/mods.js";
(document.body || document.head || document.documentElement).appendChild(script);

/*
repo:
https://greasyfork.org/en/users/18470-rendyhafizt/webhook

http://www.agariomods.com

*/