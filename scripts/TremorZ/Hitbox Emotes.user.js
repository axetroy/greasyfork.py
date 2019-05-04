// ==UserScript==
// @name Hitbox Emotes
// @namespace Hitbox Emotes
// @description The original Hitbox Emotes script with over 13,000 emotes!
// @include	*.hitbox.tv/*
// @include	*.vgstreams.com/*
// @include	*.multistream.xuzia.com/*
// @icon http://i.imgur.com/fa1Kkku.png
// @version 1.3.4
// ==/UserScript==
 
function hitbox_init()
{	
	console.log("Hitbox Emotes: Main script loaded.")
 
	var MainEmotes = document.createElement('script');
	MainEmotes.type = 'text/javascript';
	MainEmotes.src = "https://dl.dropboxusercontent.com/u/23313911/MainEmotes.js";
	
	var BackupEmotes = document.createElement('script');
	BackupEmotes.type = 'text/javascript';
	BackupEmotes.src = "https://cdn.rawgit.com/GamingTom/11142192/raw/fdd206a1a9e892a0f0c55f1de253981d980fa0e8/MainEmotes.js";
	
	var CustomEmotes = document.createElement('script');
	CustomEmotes.type = 'text/javascript';
	CustomEmotes.src = "https://dl.dropboxusercontent.com/u/23313911/CustomEmotes.js";
	
	var style = document.createElement('style');
	style.textContent = ".chatBody .smiley {max-height: 32px !important;width: auto !important;height: auto !important;}";
	
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		head.appendChild(MainEmotes);
		console.log("Hitbox Emotes: Main emotes loaded from " + MainEmotes.src)
		head.appendChild(BackupEmotes);
		console.log("Hitbox Emotes: Backup emotes loaded from " + BackupEmotes.src)
		head.appendChild(CustomEmotes);
		console.log("Hitbox Emotes: Custom emotes loaded from " + CustomEmotes.src)
		head.appendChild(style);
		console.log("Hitbox Emotes: Custom style loaded")
	}
}
 
 
window.onload = hitbox_init;