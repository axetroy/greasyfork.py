// ==UserScript==
// @name          Lichess Hide Homepage Timeline
// @namespace     http://userstyles.org
// @description   Hides Lichess Homepage Timeline Section
// @author        636597
// @include       *://*lichess.org/
// @run-at        document-start
// @version       0.1
// ==/UserScript==

var lichess_timeline_id = "timeline";
var lichess_timeline_element = null;

function loadObserver() {
	lichess_timeline_element.setAttribute( "style" , "visibility: hidden !important" );
	console.log( "Lichess Hide Homepage Timeline Loaded" );
}

(function() {
	console.log( "Lichess Hide Homepage Timeline Initializing" )
	var ready = setInterval(function(){
		var x1 = document.getElementById( lichess_timeline_id );
		if ( x1 ) {
			lichess_timeline_element = x1;
			clearInterval( ready );
			loadObserver();
		}
	} , 2 );
	setTimeout( function() { clearInterval( ready ); } , 20000 );
})();