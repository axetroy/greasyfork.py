// ==UserScript==
// @name        	Formatador de referências
// @namespace   	Nenhum
// @description 	Formata referências para serem usadas na Wikipédia. Para utilizar, basta apertar CTRL + Q em qualquer site que aparecerá um prompt com a referência já formatada.
// @version     	1.6
// @date		    04/apr/2012
// @update		    31/dec/2017
// @grant          	none
// @include	    	*
// @exclude	    	*wikipedia.org*
// ==/UserScript==
/* jshint laxbreak: true */

( function( window ) {
'use strict';

function formatReferences( event ) {
	var archive, ref,
		is_archive = location.hostname === 'wayback.archive.org' || location.hostname === 'web.archive.org',
		date = new Date(),
		months = [
			'janeiro', 'fevereiro', 'março', 'abril',
			'maio', 'junho', 'julho', 'agosto',
			'setembro', 'outubro', 'novembro', 'dezembro'
		];

	ref = '<ref>{{Citar web|url=' + location.href
		+ '|título=' + document.title.replace( /\|/g, '-' )
		+ '|publicado=' + ( !is_archive ? location.hostname : /(?:http:\/\/|www\.)(?!wayback|web\.archive)(.*)\//g.exec( location.href )[ 1 ] )
		+ '|acessodata=' + [
			date.getDate().toString().replace( /^0/, '' ).replace( /^(1)$/, '$1º' ),
			months[ date.getMonth() ],
			date.getFullYear()
		].join( ' de ' )
		+ '}}</ref>';

	if ( is_archive ) {
		archive = /b\/(\d+)/g.exec( location.href );
		ref = ref.replace(
			ref.substr( ref.indexOf( '=' ) + 1, location.href.length ),
			/\d\/(.+)/.exec( location.href )[ 1 ]
				+ '|arquivourl=' + location.href
				+ '|arquivodata=' + [
					archive[ 1 ].substr( 6, 2 ).replace( /^0/, '' ).replace( /^(1)$/, '$1º' ),
					months[ archive[ 1 ].substr( 4, 2 ).replace( /^0/, '' ) - 1 ],
					archive[ 1 ].substr( 0, 4 )
				].join( ' de ' )
		);
	}

	window.prompt( 'Referência formatada: ', ref );
}

document.onkeydown = function( event ) {
	// CTRL + Q
	if ( event.ctrlKey && event.keyCode === 81 )
		formatReferences( event );
};

} )( window );