// ==UserScript==
// @name       classical-music-online.net music free downloader
// @version    0.1
// @description  Just click on a player button, and you'll get a .mp3 file.
// @include      *classical-music-online.net/en/production/*
// @copyright  2014, Ashtolz
// @namespace https://greasyfork.org/users/2546
// ==/UserScript==
 
var mid = document.getElementsByClassName('playerContainer')[0].childNodes[1].href.split('/')[5];
document.getElementsByClassName('playerContainer')[0].childNodes[1].href = '/a.php?file_id='+mid;
document.getElementsByClassName('playerContainer')[0].childNodes[1].onclick = '';