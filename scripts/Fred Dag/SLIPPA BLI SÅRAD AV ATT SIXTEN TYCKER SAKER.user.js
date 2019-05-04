// ==UserScript==
// @name        SLIPPA BLI SÅRAD AV ATT SIXTEN TYCKER SAKER
// @namespace   https://happyride.se/*
// @include     https://happyride.se/*
// @version     1
// @grant       none
// @description Skapar bättre stämning på Happyride
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

slippaBliSaaradAvAttSixtenTyckerSaker();

function slippaBliSaaradAvAttSixtenTyckerSaker() {
	$('a.author[href="https://happyride.se/forum/profile.php/1/34297"]').closest('li.forum-post').find('div.buttons-group').prev().before('<br><br>...tycker jag.');
}