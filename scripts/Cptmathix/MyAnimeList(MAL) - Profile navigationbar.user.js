// ==UserScript==
// @name         MyAnimeList(MAL) - Profile navigationbar
// @version      1.0.4
// @description  Add a navigation bar at the top of your profile
// @author       Cpt_mathix
// @include      *://myanimelist.net/profile*
// @exclude      *://myanimelist.net/profile/*/reviews
// @exclude      *://myanimelist.net/profile/*/recommendations
// @exclude      *://myanimelist.net/profile/*/clubs
// @exclude      *://myanimelist.net/profile/*/friends
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

var user = document.getElementsByTagName('title')[0].textContent.replace("\'s Profile - MyAnimeList.net", "");

var content = document.getElementsByClassName('container-right')[0];
var navigation = document.createElement('div');

content.insertBefore(navigation, content.firstChild);

var string = '<div id="horiznav_nav" style="margin: 5px 0 10px;">';
string +=		'<ul>';
string +=			'<li><a href="/profile/' + user + '" class="horiznav_active">Home</a></li>';
string +=			'<li><a href="/profile/' + user + '/reviews">Reviews</a></li>';
string +=			'<li><a href="/profile/' + user + '/recommendations" rel="nofollow">Recommendations</a></li>';
string +=			'<li><a href="/profile/' + user + '/clubs">Clubs</a></li>';
string +=			'<li><a href="/profile/' + user + '/friends">Friends</a></li>';
string +=		'</ul>';
string +=	'</div>';

navigation.outerHTML = string;