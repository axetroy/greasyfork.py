// ==UserScript==
// @name        Reddit-Alter imgur gif links to gifv
// @namespace   https://greasyfork.org/users/9009
// @description Converts imgur*.gif hyperlinks to their HTML 5/gifv video counterpart.
// @version     1.01
// @match      	http://www.reddit.com/*
// @match		https://www.reddit.com/*
// @grant		none
// ==/UserScript==

document.addEventListener("DOMContentLoaded", stripCats, false );

if( document.readyState === "complete" ) {
    stripCats();
}

function stripCats() {
    Array.forEach( document.links, function(a) {
        a.href = a.href.replace(/i\.imgur\.com\/(.*)\.gif$/i, "i.imgur.com/$1.gifv");
    });
}