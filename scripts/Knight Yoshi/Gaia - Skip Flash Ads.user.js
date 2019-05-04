// ==UserScript==
// @name        Gaia - Skip Flash Ads
// @namespace   GaiArch_v3
// @description Disable Flash ads or wait time if you have ABP
// @match     http://*.gaiaonline.com/launch/*
// @version     v1.0.3
// @grant       none
// ==/UserScript==

try {
var adWrapperHTML = document.getElementById('gamerollhtml');
adWrapperHTML.remove();

var flashWrapperHTML = document.getElementById('gamerollgame');
flashWrapperHTML.style="display:block;"
}
catch (e) {
console.log('Error: was not able to process Flash space: '+e)
}