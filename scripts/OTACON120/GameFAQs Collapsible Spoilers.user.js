// ==UserScript==
// @name        GameFAQs Collapsible Spoilers
// @namespace   OTACON120
// @author      OTACON120
// @version     1.0.2
// @description Replaces GameFAQs obscured-text spoilers with collapsible spoilers
// @website     http://otacon120.com/user-scripts/gamefaqs-related/collapsible-spoilers
// @include     http://www.gamefaqs.com/boards/*-*
// @match       http://www.gamefaqs.com/boards/*-*
// @grant       GM_addStyle
// ==/UserScript==

function actSpoiler() {
	if ( this.id.indexOf( 'revealSpoiler' ) !== -1 ) {
		x = this.id.replace( 'revealSpoiler-', '' );
		spoilers[ x ].style.display = 'inline';
		spoilers[ x ].innerHTML = ' ' + spoilers[ x ].innerHTML;
		spoilers[ x ].classList.toggle( 'hideSpoiler' );
		this.id = 'hideSpoiler-' + x;
		this.textContent = 'X';
		this.title = 'Hide Spoiler';
	} else if ( this.id.indexOf( 'hideSpoiler' ) !== -1 ) {
		x = this.id.replace( 'hideSpoiler-', '' );
		spoilers[ x ].removeAttribute( 'style' );
		spoilers[ x ].removeAttribute( 'title' );
		this.removeAttribute( 'title' );
		this.id = 'revealSpoiler-' + x;
		this.textContent = 'Reveal Spoiler';
	}
}

var i,
	spoilers = document.getElementsByTagName( 's' ),
	revealSpoilers = [],
	x;

GM_addStyle( '\
#content .msg_body s,\
#content .msg_body s:hover,\
#content .msg_body s a,\
#content .msg_body s a:hover {\
	background: transparent;\
	color: inherit;\
}\
\
#content .msg_body s {\
	display: inline-block;\
	width: 0;\
	height: 0;\
	overflow: hidden;\
}\
\
.hideSpoiler {\
	border: 1px dotted;\
	border-width: 0 0 1px;\
}\
\
.hideSpoiler .hideSpoiler {\
	border-width: 0 1px 0 0;\
}' );

for ( i = 0; i < spoilers.length; i++ ) {
	spoilers[i].id = 'spoiler-' + i;
	revealSpoilers[ i ] = document.createElement( 'button' );
	revealSpoilers[ i ].id = 'revealSpoiler-' + i;
	revealSpoilers[ i ].classList.add( 'btn' );
	revealSpoilers[ i ].onclick = actSpoiler;
	revealSpoilers[ i ].textContent = 'Reveal Spoiler';
	spoilers[i].parentNode.insertBefore( revealSpoilers[i], spoilers[ i ] );
}