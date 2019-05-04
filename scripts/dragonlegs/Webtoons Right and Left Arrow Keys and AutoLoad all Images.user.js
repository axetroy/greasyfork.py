// ==UserScript==
// @name        Webtoons Right and Left Arrow Keys and AutoLoad all Images
// @description Allows Arrows Keys to select next and prev chapter and loads all images
//              http://www.webtoons.com/en/*/viewer*

// @version 0.0.1.20180517233445
// @namespace https://greasyfork.org/users/47445
// ==/UserScript==
console.log("Start");
var i,
    v_html_collection = document.getElementsByClassName('_images');
function replaceImages(element) {
    'use strict';
    let image_url = element.getAttribute('data-url');
    element.src = image_url;
}
for (i = 0; i < v_html_collection.length; i++ ) {
    replaceImages(v_html_collection[i]);
}
console.log("Test arrows");
document.addEventListener('keydown', function(event) {
  console.log("Add listener");
    if (event.keyCode == 37) {
      console.log("Right arrow");
        var el = document.getElementsByClassName("pg_prev _prevEpisode NPI=a:prev,g:en_en");
        el[0].click();

    }
    else if (event.keyCode == 39) {
        var el = document.getElementsByClassName("pg_next _nextEpisode NPI=a:next,g:en_en");
        el[0].click();

    }
}, true);doc