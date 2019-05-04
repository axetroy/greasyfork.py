// ==UserScript==
// @name        Searx.me - Number Results
// @namespace   r-a-y/searx/search
// @description Number search results on searx.me.
// @version     1.0.4
// @grant       none
// @include     https://searx.me*
// @include     https://search.disroot.org*
// @include     https://search.jpope.org*
// @license     GPL v3
// ==/UserScript==

var currPage = document.querySelector( '.pull-left input[name="pageno"]' ).getAttribute('value'),
    results = document.getElementById("main_results").getElementsByTagName("h4"),
    searxVersion = document.querySelector( 'meta[name="generator"]' ).getAttribute( 'content' ).replace( 'searx/', '' );

if ( parseFloat( searxVersion ) >= 0.11 && 'searx.me' !== window.location.hostname && 'search.jpope.org' !== window.location.hostname ) {
  //currPage = currPage - 2;
}
                                          
for ( i = 0, len = results.length; i < len; ++i ) {
  newSpan    = document.createElement( "span" );
  newSpan.setAttribute( "style", "float:left; font-weight:600; font-size:.9em !important; display:inline-block; margin-top:2px; margin-right:5px;" );

  newContent = document.createTextNode( ( currPage * len + i + 1 ) + ". ");
  newSpan.appendChild( newContent );

  results[i].insertBefore( newSpan, results[i].firstChild );
}