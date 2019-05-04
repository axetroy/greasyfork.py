// ==UserScript==
// @name        AhmadAlshareef
// @include     http://facebook.com
// @include     http://facebook.com/*
// @include     http://www.facebook.com
// @include     http://www.facebook.com/*
// @include     https://facebook.com/*
// @include     https://facebook.com
// @include     https://www.facebook.com/*
// @include     https://www.facebook.com
// @description this is a script for make love to all posts on facebook page
so you can love all your friend posts
it is easy to do
just 1 button


// @version 0.0.1.20160226221516
// @namespace https://greasyfork.org/users/31819
// ==/UserScript==


// ==Love Friend Profile==
//  create
var btnFbLike = document.createElement( 'input' );
with( btnFbLike ) {
  setAttribute( 'type', 'button' );
  setAttribute( 'value', 'Love All' );
  setAttribute( 'onclick', 'javascript: var inputs = document.getElementsByClassName("_iuz love"); for(var i=0; i<inputs.length;i++) { inputs[i].click(); }' );
  setAttribute( 'style', 'position: fixed; top: 55px; left: 10px; font-weight: bold; font-size: 12px; font-family: calibri; color: white; black; border: 1px solid; border-radius: 25px; background-color: rgb(255, 0, 0); padding: 2px 5px 2px 5px;' )
}


document.getElementsByTagName( 'body' )[ 0 ].appendChild( btnFbLike );


// ==infoButton==

//  create
var btnInfo = document.createElement( 'span' );
with( btnInfo ) {
  innerHTML = "<a href='http://facebook.com/ahmad.alshareef2' target='_blank' style='text-decoration: none;'> About </a>"
  setAttribute( 'style', 'position: fixed; top: 115px; left: 10px; font-weight: bold; font-size: 12px; font-family: calibri; color: rgb(70, 98, 158); border: 1px solid; border-color: rgb(255, 0, 0); border-radius: 25px; background-color: white; padding: 2px 10px 2px 10px;')
}

// append at end
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btnInfo );

// ==/infoButton==





