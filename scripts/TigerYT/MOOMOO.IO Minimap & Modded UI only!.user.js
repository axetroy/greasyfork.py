// ==UserScript==
// @name         MOOMOO.IO Minimap & Modded UI only!
// @namespace    MOOMOO.IO Minimap & Modded UI only!
// @version      1
// @description  Better Minimap, Modded UI
// @author       TigerYT
// @match        http://moomoo.io/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// @connect      moomoo.io
// @icon         http://moomoo.io/img/icons/skull.png
// ==/UserScript==

$("#youtuberOf").remove();
$("#followText").remove();
$("#twitterFollow").remove();
$("#youtubeFollow").remove();
$("#adCard").remove();
$("#mobileInstructions").remove();
$("#promoImgHolder").remove();
$("#downloadButtonContainer").remove();
$("#mobileDownloadButtonContainer").remove();
$(".downloadBadge").remove();


	$('#mapDisplay').css({
		'background': 'url("https://cdn.discordapp.com/attachments/374333551858155530/376303720540930048/moomooio-background.png")'
	});