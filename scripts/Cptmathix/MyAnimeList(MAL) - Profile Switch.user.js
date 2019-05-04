// ==UserScript==
// @name         MyAnimeList(MAL) - Profile Switch
// @version      1.0.8
// @description  Switch "About me" and "Statistics" in your profile
// @author       Cpt_mathix
// @include      *://myanimelist.net/profile*
// @exclude      *://myanimelist.net/profile/*/reviews
// @exclude      *://myanimelist.net/profile/*/recommendations
// @exclude      *://myanimelist.net/profile/*/clubs
// @exclude      *://myanimelist.net/profile/*/friends
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

// solve conflict with navigationbar script
var n = 0;
if (document.getElementById('horiznav_nav') !== null)
    n = 1;

// switch statistics and user information
var profile = document.getElementsByClassName('container-right')[0];
if (profile.innerHTML.indexOf('user-profile-about') > -1) {
    profile = profile.childNodes;
    profile[3+n].parentNode.insertBefore(profile[3+n], profile[0+n]);
}
