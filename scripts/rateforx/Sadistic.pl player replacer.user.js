// ==UserScript==
// @name     Sadistic.pl player replacer
// @description:pl  Skrypcik podmieniający player Sadistica na "przeglądarkowy" player HTML5.
// @version  1.1
// @grant    none
// @include *sadistic.pl/*
// @require	https://code.jquery.com/jquery-3.2.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js
// @namespace https://greasyfork.org/users/120356
// @description Skrypcik podmieniający nowy, chujowy player sadistica na wbudowany w nowsze przeglądarki player multimediów HTML5.
// ==/UserScript==

let css = `
	video {
		background: black;
		width: 768px;
		height: 432px;
	}
	video:focus {
		outline: none;
	}
`;

$( document ).ready( function() {
  
  $( 'body' ).append( `<style>${css}</style>` );
  
  let token = '';
  $.ajax( {
    url: '/ajax/token', 
    success: result => token = result,
    async: false,
  } );
  
  let players = $( '.player_embed' );
  
  let scripts = players.children( 'script' );
  
  for( i = 0; i < scripts.length; i++ ) {
    let start = scripts[ i ].text.search( 'file:"' ) + 6;
    let end = scripts[ i ].text.search( '.mp4' ) + 4;
    let link = scripts[ i ].text.slice( start, end );
    let parent = players[ i ].parentElement;
    $( parent ).append( "<video controls><source src='" + link + token + "' type='video/mp4'></video>" );
  }
  
  let video = $( 'video' );
  /**
    * adjust volume with scroll wheel when cursor is hovering above the player
   **/  
  const LEFT = 149;
  const RIGHT = 37;
  const TOP = 39;
  const BOTTOM = 0;
  
  video.mousewheel( function( e ) {
    
    if( e.target.paused ) return;
    
    w = parseInt( $( e.target ).css( 'width' ) );
    h = parseInt( $( e.target ).css( 'height' ) );
    x = e.offsetX;
    y = e.offsetY;
    
    //if( x > w - LEFT && x < w - RIGHT && y > h - TOP ) {
      e.preventDefault();
      vol = e.target.volume;
      if( e.deltaY == 1 && vol < 1 ) e.target.volume = vol + .1;
      if( e.deltaY == -1  && vol > 0 ) e.target.volume = vol - .1;
    //}
	})
  
  players.remove();
  jwplayer = undefined;
  
});