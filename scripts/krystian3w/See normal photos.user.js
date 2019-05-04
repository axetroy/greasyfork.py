// ==UserScript==
// @name         See normal photos
// @description  no more blur/fog on dobreprogramy.pl in articles/blogs.
// @exclude      https://www.dobreprogramy.pl/*,Kategoria,Lab,*.html
// @exclude      https://www.dobreprogramy.pl/*,Kategoria,Wideo,*.html
// @include      https://www.dobreprogramy.pl/*,Lab,*
// @include      https://www.dobreprogramy.pl/*,News,*
// @include      https://www.dobreprogramy.pl/*,Wideo,*
// @include      https://www.dobreprogramy.pl/*,Blog,*
// @include      https://www.dobreprogramy.pl/*/*.html
// @include      https://www.dobreprogramy.pl/*/*.html#komentarze
// @icon         https://i.imgur.com/eBEviAw.png
// @homepageURL  https://greasyfork.org/pl/scripts/37689-see-normal-photos
// @version      1.0.14
// @author       krystian3w
// @run-at       document-end
// @grant        none
// @compatible   firefox Firefox
// @compatible   chrome Chrome
// @namespace https://greasyfork.org/users/167625
// ==/UserScript==

(function () {
  'use strict';

  var body = document.getElementsByTagName("body")[0];

  body.addEventListener("mouseover", function () {
    $('figure.graf-figure div.progressiveMedia.is-canvasLoaded').addClass('is-imageLoaded');

    jQuery("img.progressiveMedia-image").each(function () {
      var src = jQuery(this).attr('data-src');
      var a = jQuery(this).attr('src', src);
    });

  });

})();