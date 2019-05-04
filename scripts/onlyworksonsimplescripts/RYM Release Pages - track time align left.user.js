// ==UserScript==
// @name        RYM Release Pages - track time align left
// @namespace   tracktime_align_left
// @description left aligns total track time in RYM release pages in glorious 60 fps
// @locale      EN
// @include     https://rateyourmusic.com/release/*
// @include     http://rateyourmusic.com/release/*
// @version     1
// @grant       none
// ==/UserScript==
$("span.tracklist_total").css("display","block");
$("span.tracklist_total").css("text-align","left");
