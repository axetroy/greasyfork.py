// ==UserScript==
// @name cgL-grepolisBot
// @namespace https://crigl.com/
// @version 0.1
// @description GrepolisBot with city designer, autoreconnector, autobuilder,autofarmer,autoattack, account guardian and much more!
// @include                     http://*.grepolis.com/*
// @include                     https://*.grepolis.com/*
// @exclude                     forum.*.grepolis.*/*
// @exclude                     wiki.*.grepolis.*/*
// @require     https://code.jquery.com/jquery-1.12.4.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "//crigl.com/webscripts/cgL-grepolis/bot/bot.js?nocache=" + Math.random();
document.getElementsByTagName("head")[0].appendChild(script);

