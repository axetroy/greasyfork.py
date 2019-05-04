// ==UserScript==
// @name        links desfiltrados
// @namespace   asdf
// @description asdf
// @include     55chan.org
// @version     1
// @grant       none
// ==/UserScript==

$(function() {
  $('.body > a').each(function() {
   if( $(this).attr('href').substring(0,23) === "http://privatelink.de/?" ){
      var newhref = $(this).attr('href').replace("http://privatelink.de/?","");
      $(this).attr('href', newhref);
   }
  });
}