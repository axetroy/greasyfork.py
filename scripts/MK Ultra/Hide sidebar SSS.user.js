// ==UserScript==
// @name     Hide sidebar SSS
// @include  http*://sneakysneakysnake.blogspot.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant    GM_addStyle
// @description Hide it

// @version 0.0.1.20170509053427
// @namespace https://greasyfork.org/users/112442
// ==/UserScript==

var div = document.getElementById("secondary");
if (div) {
    div.style.display = "none"; // Hides it
    // Or
    // div.parentNode.removeChild(div); // Removes it entirely
}

var div2 = document.getElementById("colophon");
if (div2) {
    div2.style.display = "none"; // Hides it
}

var div3 = document.getElementById("masthead");
if (div3) {
    div3.style.display = "none"; // Hides it
}

$('.wrapper').children().unwrap();
$('*').css('background', 'black');







