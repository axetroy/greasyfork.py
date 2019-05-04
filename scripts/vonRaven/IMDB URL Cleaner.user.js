// ==UserScript==
// @name        IMDB URL Cleaner
// @namespace   IMDB URL Cleaner
// @description Cleans the URL for a title's page on IMDB
// @version     1
// @grant       none
// @include     http://www.imdb.com/title/*
// ==/UserScript==

if (window.location.search.length > 0) {
    window.history.pushState(null, null, window.location.href.replace(window.location.search, ""));
}