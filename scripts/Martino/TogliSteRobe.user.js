// ==UserScript==
// @name        TogliSteRobe
// @namespace   http*://*.ikariam.*/*
// @description Toglie palloni e fontana
// @include     http*://*.ikariam.*/*
// @version     1.0.2
// @grant       none
// ==/UserScript==
var box=document.getElementById('cityFlyingShopContainer');
var parente=document.getElementById('locations');
parente.removeChild(box);
