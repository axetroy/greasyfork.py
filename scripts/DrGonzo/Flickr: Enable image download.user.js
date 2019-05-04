// ==UserScript==
// @name           Flickr: Enable image download
// @namespace      DrGonzo
// @description    Removes the div in front of the image and the full size zoom pictures for easy and fast download.
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// @include        https://www.flickr.com/photos/*
// @include        https://flickr.com/photos/*
// @version 	   0.0.2
// ==/UserScript==

var c;

c = document.getElementsByClassName('spaceball');
if ((typeof c != 'undefined') && (c.length > 0)) {
    for each (var b in c) {
      b.remove();
    }
}

var d;
document.getElementsByTagName("body")[0].addEventListener('DOMSubtreeModified', function () {    
    d = document.getElementsByClassName('facade-of-protection-zoom');    
    if (typeof d != 'undefined' && d.length > 0) {
        for each (var b in d)  {
          b.remove();
        }
    }    
}, false);