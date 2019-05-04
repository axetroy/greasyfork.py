// ==UserScript==
// @name       	Reddit-Alter Gfycat gif Links
// @namespace  	https://greasyfork.org/users/9009
// @description Converts giant and fat.gfycat.com hyperlinks to their HTML 5 video counterpart.
// @version    	1.12
// @include     http://www.reddit.com/*
// @include		https://www.reddit.com/*
// @grant		none
// ==/UserScript==

document.addEventListener("DOMContentLoaded", stripCats, false );

if( document.readyState === "complete" ) {
    stripCats();
}

function stripCats() {
    Array.forEach( document.links, function(a) {
        a.href = a.href.replace(/(giant|fat)\.(.*)\.gif/i, "$2");
    });
}