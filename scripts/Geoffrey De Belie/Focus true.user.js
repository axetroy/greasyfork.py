// ==UserScript==
// @name        Focus true
// @description Trick JavaScript into thinking the document is focused
// @namespace   hugsmile.eu
// @include     http://*
// @include     https://*
// @version     2
// @grant       none
// ==/UserScript==
document.hasFocus = function () {return true;};