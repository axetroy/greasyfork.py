// ==UserScript==
// @name			fast stat
// @version			1.0
// @author			iMan
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @namespace		fast
// @description		fast stat for erepublik
// @include			http://www.erepublik.com/en/military/*
// @include			https://www.erepublik.com/en/military/*
// @run-at			document-start
// ==/UserScript==
clearInterval(unsafeWindow.statsInterval);
unsafeWindow.statsInterval = setInterval("battleStats.getBattleStats();", 1e4);