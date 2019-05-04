// ==UserScript==
// @name        DoodleGone
// @namespace   http://localhost
// @description Replace the Google logo with a hosted image
// @version     1.1
// @include     http://*.google.*/*
// @include     https://*.google.*/*
// @resource    logo https://lh6.googleusercontent.com/-Bi8HSHjvdWA/U6S9n302OoI/AAAAAAAAD9c/gxXC46BNoVQ/s0/logo11w50pc1.png
// @grant       GM_getResourceURL
// ==/UserScript==
// 
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('img');
newLogo.id = "User-Logo";
newLogo.border = 'no'
newLogo.src = GM_getResourceURL ("logo");
oldLogo.parentNode.replaceChild(newLogo, oldLogo);
