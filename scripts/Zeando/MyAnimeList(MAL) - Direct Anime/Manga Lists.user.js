// ==UserScript==
// @name        MyAnimeList(MAL) - Direct Anime/Manga Lists 
// @description Adds direct list links at the top-right of any myanimelist page.
// @author      Zeando
// @include     http://myanimelist.net/*
// @exclude     http://myanimelist.net/animelist/*
// @exclude     http://myanimelist.net/mangalist/*
// @version     1.0.2
// @grant       none
// @namespace https://greasyfork.org/users/29190
// ==/UserScript==

//checks if you're logged in (or it can't get your username for the list links)
if($('.btn-signup').length === 0) {
  //fetches the user name from the the top-right nick button
  var user = document.getElementsByClassName('header-profile-link')[0].textContent;//.replace("\'s Profile - MyAnimeList.net", "");

  //fetches the position where to add the new lines
  var content = document.getElementsByClassName('pulldown')[0];
  //prepares the new lines to get added
  var listlinks = document.createElement('div');

  //adds the new lines into the target position
  content.insertBefore(listlinks, content.firstChild); //content.firstChild=at the start, null=at the end

  //code of the lines to add
  string = 	    '<a class="header-menu-unit header-profile link-bg header-profile-link" '; 
  string +=     'style="padding:0 8px 0 8px; color: #323232;" href="http://myanimelist.net/animelist/' + user + '">My Anime List</a>';
  //string +=	'<div class="border"></div>';
  string +=	    '<a class="header-menu-unit header-profile link-bg header-profile-link" ';
  string +=     'style="padding:0 8px 0 8px; color: #323232;" href="http://myanimelist.net/mangalist/' + user + '">My Manga List</a>';
  string +=	'<div class="border"></div>';

  listlinks.outerHTML = string;
}