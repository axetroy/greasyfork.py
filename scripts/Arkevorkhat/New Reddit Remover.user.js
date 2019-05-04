// ==UserScript==
// @name         New Reddit Remover
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Redirects from New Reddit to Old Reddit.
// @author       Arkevorkhat
// @match        <$URL$>
// @grant        none
// @include https://www.reddit.com/*
// ==/UserScript==

var old = "HTTPS://old.reddit.com";
var pn = window.location.pathname;

var redirect = old + "/" + pn;
window.location.replace(redirect);