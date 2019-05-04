// ==UserScript==
// @name	Toggle Zoom
// @namespace	Nickel
// @description	Toggles between zoom modes: normal, fit to width, fit to window
// @version	0.1
// @license	GNU General Public License v3
// @copyright	2016, Nickel
// @grant	none
// @run-at	document-start
// @include	*://*.jpg
// @include	*://*.jpg?*
// @include	*://*.jpeg
// @include	*://*.jpeg?*
// @include	*://*.png
// @include	*://*.png?*
// @include	*://*.gif
// @include	*://*.gif?*
// ==/UserScript==

(function(){

function toggle() {
	if( mode == "scaleToFit" ) {
		//do normal
		mode = "normal";

		img.removeAttribute( "width" );
		img.removeAttribute( "height" );

		// scaleToFit or scaleToWidth is next
		if( img.naturalWidth > document.body.clientWidth ) {
			img.setAttribute( "style", "cursor:-moz-zoom-out" );
		}
		else {
			img.setAttribute( "style", "cursor:-moz-zoom-in" );
		}
	}

	else if( mode == "normal" ) {
		if( (img.naturalWidth / img.naturalHeight) > (document.body.clientWidth / document.body.clientHeight) ) {
			// do scaleToFit
			mode = "scaleToFit";

			img.removeAttribute( "height" );
			img.setAttribute( "width", document.body.clientWidth );

			// normal is next
			if( (img.naturalWidth > document.body.clientWidth) || (img.naturalHeight > document.body.clientHeight) ) {
				img.setAttribute( "style", "cursor:-moz-zoom-in" );
			}
			else {
				img.setAttribute( "style", "cursor:-moz-zoom-out" );
			}
		}
		else {
			// do scaleToWidth
			mode = "scaleToWidth";

			img.removeAttribute( "height" );
			img.setAttribute( "width", document.body.clientWidth );
			// do it again due to scrollbars that may have appeared
			img.setAttribute( "width", document.body.clientWidth );

			// scaleToFit is next
			img.setAttribute( "style", "cursor:-moz-zoom-out" );
		}
	}

	else if( mode == "scaleToWidth" ) {
		// do scaleToFit
		mode = "scaleToFit";

		if( (img.naturalWidth / img.naturalHeight) > (document.body.clientWidth / document.body.clientHeight) ) {
			img.removeAttribute( "height" );
			img.setAttribute( "width", document.body.clientWidth );
		}
		else {
			img.removeAttribute( "width" );
			img.setAttribute( "height", document.body.clientHeight );
			// do it again due to scrollbars that may have disappeared
			img.setAttribute( "height", document.body.clientHeight );
		}

		// normal is next
		if( (img.naturalWidth > document.body.clientWidth) || (img.naturalHeight > document.body.clientHeight) ) {
			img.setAttribute( "style", "cursor:-moz-zoom-in" );
		}
		else {
			img.setAttribute( "style", "cursor:-moz-zoom-out" );
		}
	}

	setTitle();
}

function setTitle() {
	if( mode == "normal" ) {
		document.title = titlebase;
	}
	else {
		document.title = titlebase + " - Scaled (" + (img.width/img.naturalWidth*100).toFixed(0) + "%)";
	}
}




var img = document.images[0];
img.setAttribute( "style", "cursor:-moz-zoom-in" );

// preliminary vars
var mode = "scaleToFit";
var titlebase = "Image";

// get image metadata as early as possible to predict which image mode Firefox has set
wait = setInterval( function() {
	//console.log("width: " + img.naturalWidth + ", height: " + img.naturalHeight);
	if( img.naturalWidth != 0 && img.naturalHeight != 0 ) {
		// now we have metadata
		clearInterval(wait);
		if( (img.naturalWidth > document.body.clientWidth) || (img.naturalHeight > document.body.clientHeight) ) {
			mode = "scaleToFit";
		}
		else {
			mode = "normal";
		}
	}
}, 10 );

// do a few things when image has finished loading
img.onload = function() {
	clearInterval(wait);
	img.classList.remove( "shrinkToFit" );
	titlebase = document.title.replace( / - Scaled \(.*\)$/, "" );
	setTitle();
};

// add new left mouse button event listener, sabotage default one
// FIXME: only want to listen on img, not document, but need to disable default EventListener too
document.addEventListener( "click", function(e) {
	if( e.button === 0 ) {
		toggle();
		e.stopPropagation();
	}
}, true );

})();