// ==UserScript==
// @name         MyAnimeList(MAL) - Profile Switch (3 - list buttons)
// @version      1.0.4
// @description  Place list buttons below profile picture
// @author       Cpt_mathix
// @match        *://myanimelist.net/profile*
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

// place list buttons under profile picture
var user = document.getElementsByClassName('user-profile')[0].childNodes;
user[7].parentNode.insertBefore(user[7], user[2]);