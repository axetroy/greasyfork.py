// ==UserScript==
// @name        RYM spoiler removal
// @namespace   spoilerdestroyer
// @description destroys RYM Spoilers
// @include     https://rateyourmusic.com/
// @include     http://rateyourmusic.com/
// @include     https://rateyourmusic.com/*
// @include     http://rateyourmusic.com/*
// @version     1.1
// @grant       none
// ==/UserScript==
//Static stars
$("span[id^='spoiler']:not(span[id^='spoilerinner'])").each(function (i, el) {
   $(this).html('<span class="spoiler">spoiler begins</span>');
});
$("span[id^='spoilerinner']").each(function (i, el) {
   $(this).css('display','inline-block');
   $(this).append("<span class='spoiler'>spoiler ends</span>");
});