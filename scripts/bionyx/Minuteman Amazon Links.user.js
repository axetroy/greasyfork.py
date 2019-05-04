// ==UserScript==
// @name        Minuteman Amazon Links
// @namespace   https://greasyfork.org
// @description Adds links to search for books at the Minuteman Library Network in Massachusetts
// @include     https://www.amazon.com/*
// @include     http://www.amazon.com/*
// @version     1.2
// @grant       none
// ==/UserScript==
var loc=jQuery('#productTitle')[0];
var name=loc.textContent;
jQuery("<p><a target='_blank' href=http://find.minlib.net/iii/encore/search/C__S"+encodeURIComponent(name)+"__Orightresult__U>Find at Library</a></p>").appendTo(loc.parentNode.parentNode);