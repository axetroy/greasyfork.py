// ==UserScript==
// @name        neziskovky.cz - opraveni odkazu pri chybejicim prefixu "http://"
// @description Fixes links in the catalogue.
// @description:cs Opravuje odkazy na nezskove organizace v katalogu.
// @namespace   monnef.tk
// @include     http://www.neziskovky.cz/*
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.9.3/lodash.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {
  $(".prace_pul_p:contains('url:')").each(function() {
    var elem = $(this);
    var link = elem.find("a");
    var linkStr = link.attr("href");
    if (!_.startsWith(linkStr, "http")) {
      link.attr("href", "http://" + linkStr);
      var oldTitle = link.attr("title");
      link.attr("title", (oldTitle ? oldTitle + " " : "") + "(fixed link)");
    }
  });
});
