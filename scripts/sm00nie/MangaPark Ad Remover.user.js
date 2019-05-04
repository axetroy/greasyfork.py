// ==UserScript==
// @name     MangaPark Ad Remover
// @author  sm00nie
// @version  1.01
// @description Removes the "popup" divs
// @grant    none
// @include /^https?:\/\/(?:www\.)?mangapark\.me(?:.*)$/
// @require http://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/165048
// ==/UserScript==
$(window).bind("load", function() {
   $('*[class^="kiwi"]').remove();
});