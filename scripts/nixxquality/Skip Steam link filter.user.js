// ==UserScript==
// @name        Skip Steam link filter
// @namespace   https://github.com/nixxquality/
// @include     https://steamcommunity.com/linkfilter/*
// @version     2
// @run-at      document-start
// @description Only use this if you're not retarded.
// ==/UserScript==
window.location = String(window.location).substr(43);