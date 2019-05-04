// ==UserScript==
// @name     Unnamed Script 311383
// @version  1.2
// @include  http://www.jeuxvideo.com/*
// @include  https://www.jeuxvideo.com/*
// @match  http://www.jeuxvideo.com/*
// @match  https://www.jeuxvideo.com/*
// @description Combattre le bot !
// @grant    none
// @namespace https://greasyfork.org/users/103119
// ==/UserScript==

document.getElementById("message_topic").value = "https://www.egaliteetreconciliation.fr/";
setTimeout(function() {document.getElementsByClassName("btn btn-poster-msg datalayer-push js-post-message")[0].click();}, 2000);