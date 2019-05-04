// ==UserScript==
// @name         Hide Ignored BSN Posts
// @version      03.31.2015
// @description  Sets all posts by ignored users to display: none
// @author       screwball8
// @include      http://forum.bioware.com/*
// @grant        none
// @namespace    https://greasyfork.org/users/2524
// ==/UserScript==

var posts = document.getElementsByClassName('post_ignore');
for (var i=0; i<posts.length; i++) {
    posts[i].style.display = 'none';
}