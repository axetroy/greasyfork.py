// ==UserScript==
// @name         MyAnimeList(MAL) - Profile Switch (4 - Delete friend section)
// @version      1.0.3
// @description  Delete friend section on your profile
// @author       Cpt_mathix
// @match        *://myanimelist.net/profile*
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

// delete friends section
var friend = document.getElementsByClassName('user-profile')[0].children;
for(var i = 0; i < friend.length; i++) {
    if (friend[i].textContent.indexOf("Friends") > -1)
        friend[i].style.display = "none";
    if (friend[i].innerHTML !== null && friend[i].innerHTML.indexOf("icon-friend") > -1)
        friend[i].style.display = "none";
}