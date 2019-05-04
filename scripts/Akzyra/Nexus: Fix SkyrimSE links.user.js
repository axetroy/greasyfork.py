// ==UserScript==
// @name        Nexus: Fix SkyrimSE links
// @description Redirects nexusmods.com/skyrimse/xxx to the right site.
// @namespace   llinstant
// @include     http://www.nexusmods.com/skyrimse/*
// @version     1
// @grant       none
// ==/UserScript==

var url = window.location.href;
url = url.replace("/skyrimse/", "/skyrimspecialedition/");
window.location = url;