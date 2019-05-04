// ==UserScript==
// @name        RYM Blackstar
// @namespace   blackstar
// @description Pay tribute to David Bowie with this userscript.
// @include     https://rateyourmusic.com/
// @include     http://rateyourmusic.com/
// @include     https://rateyourmusic.com/*
// @include     http://rateyourmusic.com/*
// @version     1.3
// @grant       none
// ==/UserScript==
//Static stars
var changeStarColor = $("body").html().replace(/ssl.cf1.rackcdn.com\/images\/([0-9m]{1,2}).+(.png)/g,'ssl.cf1.rackcdn.com/images/black/$1mb.png');
$("body").html(changeStarColor);
//Dynamic stars(Rate/Catalogue)
var backgroundImageURL = $('.rating_stars').css('background-image');
backgroundImageURL = backgroundImageURL.replace('star_sprite_4','star_sprite_black');
$('.rating_stars').css("background-image",backgroundImageURL);