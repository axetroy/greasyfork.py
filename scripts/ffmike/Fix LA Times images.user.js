// ==UserScript==
// @name        Fix LA Times images
// @namespace   ffmike
// @description Put images back
// @grant       none
// @include     http://www.latimes.com/*
// @include     https://www.latimes.com/*
// @version     1
// @domain      www.latimes.com
// @license     CC0 1.0; https://creativecommons.org/publicdomain/zero/1.0/
// ==/UserScript==
//$(function () {
console.log('runningy');
latImages = document.getElementsByTagName("img");
for(var i=0; i<latImages.length; i++) {
//  console.log(i);
  latImage = latImages[i];
  imgURL = latImage.getAttribute('data-baseurl');
//        imgURL = images[i].data('baseurl');
//      console.log(i + imgURL);
  latImage.setAttribute("src", imgURL);
}

//});