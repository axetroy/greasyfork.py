// ==UserScript==
// @name           Flickr Img src
// @namespace      AfzalivE
// @description    Removes the stupid div in from of the image
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// @version 0.0.1.20140811015305
// ==/UserScript==

function removeElement(divNum) {
  var d = document.getElementById('photo');
  var olddiv = document.getElementById(divNum);
  d.removeChild(olddiv);
}

removeElement("photo-drag-proxy");
