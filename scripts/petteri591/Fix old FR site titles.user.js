// ==UserScript==
// @name        Fix old FR site titles
// @namespace   flight_titles
// @description Fixes page titles for old site
// @include     http://flightrising.com/main.php?p=*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
  var foo = document.title;
  if (foo == "Flight Rising") {
    var bar = $($("span[style*='font-size:22px;']").contents()[0]).text();
    document.title = bar+" | "+foo;
  };
});