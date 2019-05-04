// ==UserScript==
// @name DirectShowImage
// @namespace Violentmonkey Scripts
// @description Direct show image
// @version 0.1.0
// @match https://imgdrive.net/*
// @grant none
// ==/UserScript==
// 
document.querySelector('#container .centered').style.display = 'none'
d = document.querySelector('.showcase a')
document.write('<img src="' + d.attributes.href.value + '" alt="img">')
