// ==UserScript==
// @name Twitter night mode without login
// @description Turns on night mode on Twitter even if you're not logged in.
// @namespace flan
// @match https://twitter.com/*
// @grant none
// @inject-into auto
// @version 0.0.1.20190221041324
// ==/UserScript==
document.querySelectorAll("link[rel=stylesheet]:not([href*=nightmode_])").forEach(l => l.href = l.href.replace(/[^\/]*$/, "/nightmode_$&"));