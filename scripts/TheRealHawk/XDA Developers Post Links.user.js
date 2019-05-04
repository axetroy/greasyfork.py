// ==UserScript==
// @name          XDA Developers Post Links
// @description   Changes post links so they link the thread instead of single post view
// @author        TheRealHawk
// @namespace     https://forum.xda-developers.com
// @match         https://forum.xda-developers.com/*
// @version       1.2
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

// Workaround to get rid of "'$' is not defined" warnings
var $ = window.jQuery;

var hrefwohash = window.location.href.split('#')[0];

$('.postCount').each(function() {
    var postanchor = $(this).attr('id').replace("postcount", "#post");
    $(this).attr('href', hrefwohash + postanchor);
    $(this).css({'position': 'absolute', 'right': '20px'});
    $(this).removeAttr('target');
});
