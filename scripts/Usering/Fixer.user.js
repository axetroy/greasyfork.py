// ==UserScript==
// @name           Fixer
// @version        1
// @homepage       http://www.roblox.com
// @description   Fixes annoying stuff
// @namespace https://greasyfork.org/users/3647
// ==/UserScript==

$(document).ready(function(){
	document.getElementsByClassName("buy-robux")[1].innerText = " Develop "
	document.getElementsByClassName("buy-robux")[0].href = "/develop"
})