// ==UserScript==
// @name     Random Episode Selector
// @grant    none
// @namespace   com.cool.pax
// @include     https://en.wikipedia.org/wiki/List_of_*
// @version     1
// @description:en  Select random episode from Wikipedia list article.
// ==/UserScript==

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var x = Array.from( document.querySelectorAll( ".vevent" ) );

var i = getRandomInt( x.length );

var h = x[i].querySelector( "th" );
var s = x[i].querySelector( ".summary" );

var ex = x[i].nextElementSibling;

if ( ex.className == "vevent" )
  ex = "";
else
  ex = ex.textContent;

alert( h.id + "\n" + s.textContent + "\n\n" + ex );