// ==UserScript==
// @name           StartPage.com - Number Results
// @namespace      tag:r-a-y@gmx.com,2012:monkey
// @description    Number search results on StartPage.com and other Ixquick sites - StartingPage.com and Ixquick.com
// @include        http://*startpage.com/*
// @include        https://*startpage.com/*
// @include        http://*startingpage.com/*
// @include        https://*startingpage.com/*
// @include        http://*ixquick.com/*
// @include        https://*ixquick.com/*
// @author         r-a-y
// @version        1.1
// @license        GPL v3
// ==/UserScript==

var results = document.querySelectorAll( 'li.search-item' );

for ( i = 0, len = results.length; i < len; ++i ) {
  newSpan    = document.createElement( "span" );
  newSpan.setAttribute( "style", "float:left; font-weight:600; font-size:1.2em !important; display:inline-block; margin-right:5px;" );

  newContent = document.createTextNode( ( ( pageOptions.adPage - 1 ) * len + i + 1 ) + ". ");
  newSpan.appendChild( newContent );

  results[i].insertBefore( newSpan, results[i].firstChild );
}