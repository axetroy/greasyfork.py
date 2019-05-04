// ==UserScript==
// @name         AnonDraw Helpful Mod! *BETA*
// @namespace    AnonDraw Helpful Mod! *BETA*
// @version      1
// @description  Better Cursor, More Coming Soon...
// @author       TigerYT
// @match        *://www.anondraw.com/collab/*
// @match        *://www.anondraw.com/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// @connect      anondraw.com
// @icon         https://www.anondraw.com/favicon.ico?v=aa52a77
// ==/UserScript==

	$('.drawtogether-paint-container').css({
		'cursor': 'url("https://cdn.discordapp.com/attachments/452220357084971020/452498704583229450/Crosshair_Inverted.cur"), crosshair'
	});