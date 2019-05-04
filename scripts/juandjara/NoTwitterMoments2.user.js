// ==UserScript==
// @name         NoTwitterMoments2
// @namespace    https://www.fuken.xyz
// @version      0.2
// @description  I don't like that new twitter "feature" and also i don't like JQuery much
// @author       Juan Dominguez Jara
// @match        https://*.twitter.com/*
// @grant        none
// ==/UserScript==

document.querySelector("[data-global-action=moments]").remove()