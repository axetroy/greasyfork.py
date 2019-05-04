// ==UserScript==
// @name        GoogleShkolnik
// @namespace   http://localhost
// @description Replace the Google logo with a Shkolnik
// @version     1.2
// @include     http://*.google.*/*
// @include     https://*.google.*/*
// @resource    logo http://stermcommunity.kl.com.ua/Nothing/1.png
// @grant       GM_getResourceURL
// ==/UserScript==
// 
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('img');
newLogo.id = "User-Logo";
newLogo.border = 'no'
newLogo.src = GM_getResourceURL ("logo");
oldLogo.parentNode.replaceChild(newLogo, oldLogo);