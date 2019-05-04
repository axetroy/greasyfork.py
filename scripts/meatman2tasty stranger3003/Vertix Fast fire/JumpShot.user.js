// ==UserScript==
// @name         Vertix Fast fire/JumpShot
// @namespace    http://tampermonkey.net/
// @version      1.03
// @description  SpaceBar to shoot/Hold for full clip
// @author       stranger3003
// @match        http://vertix.io/
// @grant        none
// ==/UserScript==

$("#cvs").keydown(function(c){32==c.which&&shootBullet(player)});