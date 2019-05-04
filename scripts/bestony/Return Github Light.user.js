// ==UserScript==
// @name         Return Github Light
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Make Header Light
// @author       Bestony
// @match        https://*.github.com/
// @match        https://github.com/*

// @grant        none
// @run-at       document-start
// ==/UserScript==
document.querySelector('.header').classList.remove('header-dark');