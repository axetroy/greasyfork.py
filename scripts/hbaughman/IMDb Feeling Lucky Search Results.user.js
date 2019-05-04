// ==UserScript==
// @name IMDb Feeling Lucky Search Results
// @description Open the first imdb result automatically with a keyword search.
// @version 0.1
// @namespace https://github.com/hbaughman
// @icon http://www.imdb.com/favicon.ico
// @include http://www.imdb.com/find?lucky=true&q=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
this.$('.result_text').children('a')[0].click();
