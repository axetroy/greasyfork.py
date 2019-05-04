// ==UserScript==
// @name        KAT - Mass Accept
// @namespace   MassAccept
// @version     1.03
// @description Adds a button to your profile that will allow you to accept all friend requests
// @match     http://kickass.to/user/*
// @match     https://kickass.to/user/*
// ==/UserScript==

var user = $('li > a[href^="/user/"]').attr("href");
if (location.pathname == user)
{
 alert('The "KAT - Mass Accept" script has now been implemented in KAT so this can now be deleted');    
}

