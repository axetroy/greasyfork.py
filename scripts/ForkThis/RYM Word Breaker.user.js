// ==UserScript==
// @name        RYM Word Breaker
// @namespace   rymwordbreaker
// @description makes long text behave
// @include     https://rateyourmusic.com/
// @include     http://rateyourmusic.com/
// @include     https://rateyourmusic.com/*
// @include     http://rateyourmusic.com/*
// @version     1.0
// @grant       none
// ==/UserScript==
$("blockquote").each(function (i, el) {
   $(this).css('word-break','break-word');
});
