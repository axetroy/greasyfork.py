// ==UserScript==
// @name        Cyclewear Cookie Notice Deleter
// @namespace   CookieFoetsie
// @include     http://cyclewear.*/*
// @version     1.1
// @description Removes Black Cookie Notice Bar from bottom of screen
// ==/UserScript==

// remove cookie notice footer
var CookieFoetsie = document.getElementById('cookiesdirective');
CookieFoetsie.parentElement.removeChild(CookieFoetsie);