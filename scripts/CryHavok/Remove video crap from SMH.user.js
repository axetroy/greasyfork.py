// ==UserScript==
// @name        Remove video crap from SMH
// @namespace   SMH
// @description Removes the video element from SMH site
// @include     http://www.smh.com.au/*
// @version     1
// @grant       none
// ==/UserScript==

var targetDiv = document.getElementById("video-player-content");
targetDiv.parentElement.removeChild(targetDiv);
