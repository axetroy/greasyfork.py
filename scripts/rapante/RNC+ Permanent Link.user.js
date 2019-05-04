// ==UserScript==
// @name		RNC+ Permanent Link
// @author		Rapante & Zorglub
// @version		0.7
// @description Adds a permanent link to the Random Nonsense Club
// @match		https://forums.oneplus.net/*
// @copyright	2012+, Rapante & Zorglub

// @namespace https://greasyfork.org/users/3232
// ==/UserScript==

/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function()
{
    setTimeout(function()
    {   
        bg = window.getComputedStyle(document.body, null).backgroundColor;
        chosenStyle = bg == "rgb(34, 34, 34)" ? "url( https://bytebucket.org/ojanoschek/rnc-link/raw/e0305a90e22672e0bb7ed24d91fea3a722ba2ab5/i/logo_dark.gif )" : "url( https://bytebucket.org/ojanoschek/rnc-link/raw/e0305a90e22672e0bb7ed24d91fea3a722ba2ab5/i/logo_light.gif )";
        RNCLink = document.createElement("li");
        RNCLink.innerHTML = "<a href='https://forums.oneplus.net/threads/offtopic-random-nonsense-club.358/unread' style='width:44px;text-indent:-9999px;background:" + chosenStyle + ";' id='RNCButton'>RNC</a>";
        menu = document.getElementsByClassName('nav-pills')[0];
        menu.insertBefore(RNCLink, menu.firstChild);
    }, 20);
});