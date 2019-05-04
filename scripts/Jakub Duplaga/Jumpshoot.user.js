// ==UserScript==
// @name         Jumpshoot
// @namespace    KROKIk
// @version      1
// @description  Skacz spacją i strzelaj przy okazji
// @author       KROKIk
// @match        http://vertix.io/
// @grant        none
// ==/UserScript==

$("#cvs").keydown(function(c){32==c.which&&shootBullet(player)});