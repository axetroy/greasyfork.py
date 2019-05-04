// ==UserScript==
// @name         Skin Collection
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Skin gallery for alis.io
// @author       Tinsten
// @match        http://alis.io/
// @grant        none
// ==/UserScript==
//By Tinsten, please don't copy, manipulate or similar. Just create your own script. Enjoy!
var htscodeJS = '<script type="text/javascript" src="http://htscode.net/projects/skin-collection/main.js"></script>';


$(document).ready(function(){
	$('body').append(htscodeJS);
});