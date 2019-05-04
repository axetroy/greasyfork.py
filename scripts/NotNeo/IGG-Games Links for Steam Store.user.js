// ==UserScript==
// @name         IGG-Games Links for Steam Store
// @namespace    NotNeo
// @author       NotNeo
// @version      0.1
// @description  Simply adds a IGG-Games link to all games on the steam store
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @match        http://store.steampowered.com/app/*
// @grant        none
// ==/UserScript==

var appName = $(".apphub_AppName").text();
var iggSearchBaseUrl = "http://igg-games.com/?s=";
$(".game_purchase_action_bg:first").append(' <a href="'+iggSearchBaseUrl+appName+'" style="margin-left: 10px; padding-right: 10px;">IGG</a> ');