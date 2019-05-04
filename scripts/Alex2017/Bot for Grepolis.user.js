// ==UserScript==
// @name                        Bot for Grepolis
// @namespace                   Bot for Grepolis
// @description                 Bot for Grepolis.
// @author                      green elephant
// @version                     2.1
// @include                     http://*.grepolis.com/*
// @include                     https://*.grepolis.com/*
// @exclude                     forum.*.grepolis.*/*
// @exclude                     wiki.*.grepolis.*/*

// ==/UserScript==

(function(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "//botsoft.org/bot/bot.js?nocache=" + Math.random();
	document.getElementsByTagName("head")[0].appendChild(script);
})();