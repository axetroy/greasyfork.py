/*
All Credit for this userscript goes to NotNeo. I simply fixed a small bug that stopped this script from working on Steam in 2019.
*/
// ==UserScript==
// @name         IGG-Games Links for Steam Store(Updated)
// @namespace    NotNeo
// @author       NotNeo
// @version      0.1.1
// @description  Simply adds an IGG-Games link to all games on the steam store (Fixed for Steam's update to 100% SSL/HTTPS. Would not work otherwise.)
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @match        https://store.steampowered.com/app/*
// @grant        none
// ==/UserScript==

var appName = $(".apphub_AppName").text();
var iggSearchBaseUrl = "http://igg-games.com/?s=";
$(".game_purchase_action_bg:first").append(' <a href="'+iggSearchBaseUrl+appName+'" style="margin-left: 10px; padding-right: 10px;">IGG</a> ');