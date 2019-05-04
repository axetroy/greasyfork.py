// ==UserScript==
// @name	       Redit Comment Form Hider
// @description        Hides reddit comment form
// @version            1.0
// @include            http*://www.reddit.com/**
// @grant              none
// @namespace https://greasyfork.org/users/153157
// ==/UserScript==

var commentForm = document.querySelector('.commentarea > .usertext');
if (commentForm) {
  commentForm.style.display = 'none';
}