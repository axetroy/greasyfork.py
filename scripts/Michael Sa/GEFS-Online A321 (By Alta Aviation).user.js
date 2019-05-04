// ==UserScript==
// @name GEFS-Online A321 (By Alta Aviation)
// @description This plugin adds the Airbus A321 to the game
// @namespace GEFS-Plugins
// @match http://www.gefs-online.com/gefs.php*
// @match http://gefs-online.com/gefs.php*
// @run-at document-end
// @version 1.0.0
// @grant none
// ==/UserScript==
 
var menuitem =  $('<li><a href="#" onmouseup="ges.aircraft.change(\'214\')">A321 (By Alta Aviation - AAD)</a></li>').appendTo($('.dropdown-menu').eq(2).children('.dropdown-submenu').last().children('ul'));
