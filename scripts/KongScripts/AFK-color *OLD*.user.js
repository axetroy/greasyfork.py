// ==UserScript==
// @name        AFK-color *OLD*
// @include     http://www.kongregate.com/games/*
// @description Changes color of AFK-users
// @license     Public Domain
// @version 0.0.1.20160422202924
// @namespace https://greasyfork.org/users/32649
// ==/UserScript==

x=document.styleSheets[1];
if(x){
	x.insertRule('#kong_game_ui .user_row.away .username { color:#838B8B;font-style: italic;}',x.cssRules.length);
}
