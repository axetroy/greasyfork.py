// ==UserScript==
// @name         DF Hide Mouse
// @namespace    http://hermanfassett.me
// @version      1.0
// @description  Hide that mouse when fullscreen inactive! Come on already df.
// @author       Herman Fassett
// @match        https://www.dramafever.com/drama/*
// @grant        GM_addStyle
// ==/UserScript==

// Set mouse inactive
GM_addStyle(".vjs-user-inactive { cursor: none !important; }");