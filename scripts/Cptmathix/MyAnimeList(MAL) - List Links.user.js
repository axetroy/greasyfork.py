// ==UserScript==
// @name         MyAnimeList(MAL) - List Links
// @version      1.0.3
// @description  Add list links inside your statistics
// @author       Cpt_mathix
// @include      *://myanimelist.net/profile*
// @exclude      *://myanimelist.net/profile/*/reviews
// @exclude      *://myanimelist.net/profile/*/recommendations
// @exclude      *://myanimelist.net/profile/*/clubs
// @exclude      *://myanimelist.net/profile/*/friends
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

// preparations
var user = document.getElementsByTagName('title')[0].textContent.replace("\'s Profile - MyAnimeList.net", "");
var animestats = document.getElementsByClassName('stats anime')[0];
var mangastats = document.getElementsByClassName('stats manga')[0];

// create link container
var animeLink = document.createElement('div');
var mangaLink = document.createElement('div');
animestats.insertBefore(animeLink, animestats.firstChild);
mangastats.insertBefore(mangaLink, mangastats.firstChild);

// define container
animeLink.outerHTML = '<a class="floatRightHeader ff-Verdana" href="/animelist/' + user + '">Anime List</a>';
mangaLink.outerHTML = '<a class="floatRightHeader ff-Verdana" href="/mangalist/' + user + '">Manga List</a>';


