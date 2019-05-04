// ==UserScript==
// @name         iogames.space Redirect
// @version      1.2
// @description  Redirects games from iogames.space to thier source websites
// @author       someRandomGuy
// @match        http://iogames.space/*
// @grant        none
// @namespace https://greasyfork.org/users/117222
// ==/UserScript==
var a=document.getElementsByTagName("iframe")[0];
a && !a.src.startsWith(location.origin) && location.replace(a.src);