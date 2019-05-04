// ==UserScript==
// @name        No Moments
// @description Removes the "Moments" tab from Twitter's website
// @date        2015-12-04
// @include     http://*.twitter.com/*
// @include     http://twitter.com/*
// @include     https://*.twitter.com/*
// @include     https://twitter.com/*
// @license     MIT
// @run-at      document-start
// @grant       none
// @version 0.0.1.20151205014204
// @namespace https://greasyfork.org/users/6016
// ==/UserScript==

// Removes an element given the class name.
function hideByClassName(className) {
   var elements = document.getElementsByClassName( className );
   for ( var i = 0; i < elements.length; i++ ) {
     var element = elements[i];
     element.parentNode.removeChild( element );
  }
}

// Run the JS prior to page display for faster results.
window.addEventListener('beforescriptexecute', remover, true);
function remover() {
	hideByClassName('js-moments-tab');
}
