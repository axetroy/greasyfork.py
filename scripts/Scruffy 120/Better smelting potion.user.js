// ==UserScript==
// @name         Better smelting potion
// @namespace    Better smelting potion
// @version      0.1
// @description  Less confusing smelting potion
// @author       Scruffy120/Breakmyballs
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match        *.diamondhunt.co/game.php
// @grant        GM_addStyle
// ==/UserScript==

$('img[src*="smeltingpotion.png"]').attr("src", "http://i.imgur.com/uihjJ1J.png");