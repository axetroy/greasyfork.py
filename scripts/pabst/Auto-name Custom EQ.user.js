// ==UserScript==
// @name           Auto-name Custom EQ
// @namespace      pbr/ance
// @include        http://goallineblitz.com/game/buy_custom.pl?player_id=*
// @version 0.0.1.20140522062846
// @description sdfsdf
// ==/UserScript==

window.setTimeout( function() {
	var name = "Zorg Industries ZF-1";
	var line = document.getElementById("item_name");
	line.value = name;
}, 100);

