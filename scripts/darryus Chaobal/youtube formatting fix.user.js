// ==UserScript==
// @name        youtube formatting fix
// @namespace   whatever
// @description fixes whatever employee at google just did that messed up the formatting
// @include     https://www.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==
var content = document.getElementById ("content");
content.classList.add ("content-alignment");