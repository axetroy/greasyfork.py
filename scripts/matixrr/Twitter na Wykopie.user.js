// ==UserScript==
// @name        Twitter na Wykopie
// @namespace   twitternawykopie
// @description Odkrywa bez klikania wpisy z Twittera
// @include     https://*.wykop.pl/*
// @author      matixrr
// @version     1
// ==/UserScript==

function show_twitter() {
$('div:not(.no-description) > a > div.twitter-cover').click();
}

show_twitter();

$(document).ajaxComplete(function() {
show_twitter();
});