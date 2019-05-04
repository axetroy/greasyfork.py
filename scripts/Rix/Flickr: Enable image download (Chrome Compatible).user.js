// ==UserScript==
// @name           Flickr: Enable image download (Chrome Compatible)
// @namespace      https://rix.li/
// @description    Removes the div in front of the image and the full size zoom pictures for easy and fast download.
// @match          *://www.flickr.com/photos/*
// @match          *://flickr.com/photos/*
// @version 	   0.0.1
// ==/UserScript==


[].forEach.call(document.querySelectorAll('.spaceball'), function(d) {
    d.remove();
});

document.body.addEventListener('DOMSubtreeModified', function () {
    [].forEach.call(document.querySelectorAll('.facade-of-protection-zoom'), function(d) {
        d.remove();
    });
}, false);
