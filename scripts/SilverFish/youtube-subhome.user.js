// ==UserScript==
// @name        youtube-subhome
// @description Home buttons directs to subscription page
// @namespace   nah
// @include     https://www.youtube.com/*
// @version     1
// @grant       none
// @run-at       document-end
// ==/UserScript==
document.getElementById("logo-container").href = "/feed/subscriptions"