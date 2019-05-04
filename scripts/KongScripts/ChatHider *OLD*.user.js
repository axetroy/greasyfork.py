// ==UserScript==
// @name           ChatHider *OLD*
// @namespace      Kilandor
// @description    Hides chat by default, but adds show/hide links
// @include        http://*.kongregate.com/games/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 0.0.1.20160422204229
// ==/UserScript==

(function() {
	// Append some text to the element with id #someText using the jQuery library.
	$("#chat_tab_pane").wrap('<div id="kongchatroom"></div>');
	$("#main_tab_set").after('<script type="text/javascript">function konghidechat(){document.getElementById(\'kongchatroom\').style.display = \'block\';}function kongshowchat(){document.getElementById(\'kongchatroom\').style.display = \'none\';}</script><div id="kongchatmenu"><a href="#maingame" onclick="konghidechat()">Show</a> / <a href="#maingame" onclick="kongshowchat()">Hide</a></div>');
	$("#kongchatroom").css('display', 'none');
}());
