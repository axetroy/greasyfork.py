// ==UserScript==
// @name     AO3: strip empty paragraphs
// @description Strip empty paragraphs from works on Archive of Our Own
// @version  1
// @grant    none
// @include https://archiveofourown.org/works/*
// @include http://archiveofourown.org/works/*
// @namespace https://greasyfork.org/users/94761
// ==/UserScript==

var paragraphs = document.getElementsByTagName("p");

for (var i = 0; i < paragraphs.length; i++) {
  if (paragraphs[i].textContent.trim() == "") {
    paragraphs[i].remove();
  }
}