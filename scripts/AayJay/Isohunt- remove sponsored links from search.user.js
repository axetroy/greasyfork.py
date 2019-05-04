// ==UserScript==
// @name       Isohunt- remove sponsored links from search
// @version    1.0
// @description  remove fake search results that are actually sponsored ads
// @match      https://*isohunt.to/*
// @copyright  2015+, AJ
// @namespace https://greasyfork.org/users/10111
// ==/UserScript==
$('tr:contains("Sponsored")').remove()