// ==UserScript==
// @name        DoodleGoneBy Removal
// @namespace   http://localhost
// @description Replace the Google logo with a hosted image
// @version     1.2
// @include     http://*.google.*/*
// @include     https://*.google.*/*

// @grant       GM_getResourceURL
// ==/UserScript==
// 
var oldLogo = document.getElementById('hplogo');


oldLogo.parentNode.removeChild(oldLogo);
