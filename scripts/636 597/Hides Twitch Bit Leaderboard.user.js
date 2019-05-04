// ==UserScript==
// @name 		  Hides Twitch Bit Leaderboard
// @namespace     http://userstyles.org
// @description	  Hides Twitch Bits Leaderboard : 
// @author        ceberous
// @homepage      https://creatitees.info
// @include       *://*.twitch.tv/*
// @run-at        document-start
// @version       0.4
// ==/UserScript==
function wHide() {
	var wItems = [];
	var x11 = document.getElementsByClassName( "pinned-cheer-v2-header" );
	var x12 = document.getElementsByClassName( "pinned-cheer-v2" );
	var x13 = document.getElementsByClassName( "pinned-cheer-v2-header__users" );
	var x14 = document.getElementsByClassName( "bits-leaderboard-header-first-entry__container" );
	var x15 = document.getElementsByClassName( "pinned-cheer-v2 tw-z-default " );
	var x16 = document.getElementsByClassName( "pinned-cheer-v2-header__runner-up-entries" );
	var x17 = document.getElementsByClassName( "bits-leaderboard-header-first-entry" );
	var x18 = document.getElementsByClassName( "bits-leaderboard-header-runner-up-entry" );
	var x19 = document.getElementsByClassName( "bits-leaderboard-header-runner-up-entry__username" );
	var x20 = document.getElementsByClassName( "bits-leaderboard-header-runner-up-entry__score" );
	var x21 = document.getElementsByClassName( "bits-leaderboard-medal" );
	var x22 = document.getElementsByClassName( "cheermote-for-amount__cheer-amount" );
	wItems.push( x11 );
	wItems.push( x12 );
	wItems.push( x13 );
	wItems.push( x14 );
	wItems.push( x15 );
	wItems.push( x16 );
	wItems.push( x17 );
	wItems.push( x18 );
	wItems.push( x19 );
	wItems.push( x20 );
	wItems.push( x21 );
	wItems.push( x22 );
	for ( var i = 0; i < wItems.length; ++i ) {
		if ( wItems[ i ] ) {
			if ( wItems[ i ].length > 0 ) {
				for ( var j = 0; j < wItems[ i ].length; ++j ) {
					//console.log( wItems[ i ][ j ] );
					wItems[ i ][ j ].setAttribute( "style" , "visibility: hidden !important" );
					wItems[ i ][ j ].setAttribute( "style" , "height: 0px !important" );
				}
			}
		}
	}
	//console.log( "hide() finished" );
}
function trytoHide() {
	try { wHide(); }
	catch ( e ) {}
}
function initialLoadHide() {
	setTimeout( trytoHide , 5000 );	
	setTimeout( trytoHide , 6000 );	
	setTimeout( trytoHide , 7000 );	
	setTimeout( trytoHide , 8000 );	
	setTimeout( trytoHide , 9000 );	
	setTimeout( trytoHide , 10000 );	
	setTimeout( trytoHide , 11000 );	
	setTimeout( trytoHide , 12000 );	
	setTimeout( trytoHide , 13000 );	
	setTimeout( trytoHide , 14000 );	
	setTimeout( trytoHide , 15000 );
	setTimeout( trytoHide , 20000 );
	setTimeout( trytoHide , 30000 );	
}
function intervalHide() {
	setInterval( trytoHide , 3000 );
}
(function() {
	console.log( "hello ????" );
	initialLoadHide();
	setTimeout( intervalHide , 31000 );
})();