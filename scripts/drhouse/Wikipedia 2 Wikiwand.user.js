// ==UserScript==
// @name          Wikipedia 2 Wikiwand
// @version       1.0
// @run-at        document-start
// @description   This script is an easy way to try out and view Wikiwand which displays a clean and modernized version of Wikipedia.
// @include       http://en.wikipedia.org/wiki/*
// @include       https://en.wikipedia.org/wiki/*
// @exclude       http://en.wikipedia.org/wiki/*?oldformat=true
// @exclude       https://en.wikipedia.org/wiki/*?oldformat=true
// @author        drhouse
// @grant         none
// @namespace https://greasyfork.org/users/10118
// ==/UserScript==

var theurl = document.URL;
var res = theurl.replace(/en.wikipedia.org\/wiki/gi, "www.wikiwand.com/en");
window.location.href = (res);