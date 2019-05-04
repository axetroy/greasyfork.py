// ==UserScript==
// @name        Change words/phrases/advanced syntaxes in web pages
// @description Change words/phrases/advanced syntaxes/regular expressions in web pages
// @namespace   https://greasyfork.org/users/3718
// @include     http://*
// @include     https://*
// @exclude     *.google.com/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

$('body').html($('body').html().replace(/old_word_here/g,'new_word_here'));

//by default - disabled on google.com, but you can always "repair" this by removing the line with "*.google.com/*" from above :)