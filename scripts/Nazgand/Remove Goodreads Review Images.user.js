// ==UserScript==
// @name         Remove Goodreads Review Images
// @namespace    remy
// @version      2
// @description  removes all images within reviews of book on goodreads
// @author       Linux Akumetsu Nazgand
// @match        https://www.goodreads.com/book/show/*
// @grant        none
// ==/UserScript==

function theStuff() {
  document.querySelectorAll('div.reviewText img').forEach(function(image, index) {
    image.remove();
  });
}

setTimeout(theStuff, 1100);