// ==UserScript==
// @name        Taringa scroll up fix
// @namespace   http://*.taringa.net/*
// @description Fixes scroll up bug in Taringa.
// @version     1
// @grant       none
// ==/UserScript==

$('#scroll-up').on('click', function () { $.scrollTo(0, 0); });