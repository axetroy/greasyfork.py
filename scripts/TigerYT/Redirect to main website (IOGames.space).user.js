// ==UserScript==
// @name         Redirect to main website (IOGames.space)
// @version      1.1
// @description  Redirects games from iogames.space to thier main website
// @author       someRandomGuy
// @match        http://iogames.space/*
// @grant        none
// @namespace https://greasyfork.org/users/137913
// ==/UserScript==

var a=document.getElementById("gameFrame");
a&&location.replace(a.src);