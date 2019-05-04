// ==UserScript==
// @name        Transalvador Improver
// @namespace   none
// @version     1.0.8
// @author	Roger Lima (rogerlima@outlook.com)
// @grant       none
// @description Adiciona a quantidade de horários e a frequência média entre as linhas no site da Transalvador; possibilita a busca pelas linhas apertando ENTER; faz com que apareça o número das linhas filhas ao exibir o resultado da pesquisa.
// @include	http://www.transalvadorantigo.salvador.ba.gov.br/?pagina=onibus/onibus
// @include	http://www.transalvadorantigo.salvador.ba.gov.br/homologacao/?pagina=onibus/onibus
// @date	29/mar/2014
// @rewrite	16/apr/2016
// @update	03/mar/2019
// ==/UserScript==

/* jshint expr: true, laxbreak: true, esversion: 6 */
/* global jQuery, buscar_linha, buscar_codigo, change_busca */

( function( $ ) {
'use strict';

// CSS
$( 'head' ).append( $( '<style />' ).text(
	'.schedule_float { float: right; }\n'
	+ '.schedule_padding { padding: 0px 5px 0px 0px; }\n'
	+ '#schedule_amount, #schedule_average { font-weight: bold; font-family: Tahoma; }'
) );

// Format the hours
// @param {number} Time in seconds
// @return {string}
function format_time( time ) {
	var hour = Math.floor( time / 60 ),
		minutes = Math.floor( time % 60 );

	return ( hour > 0 ? ( ( hour < 10 && '0' ) + hour + 'h' ) : '' ) + ( ( minutes < 10 && '0' ) + minutes + 'min' );
}

// Show the ammount of travels and the average between them
// @return {function} closure
function schedule_features() {
	var hour_part, prev_minutes, current_minutes, average_increment,
		hours_day = 0,
		hours_afternoon = 0,
		hours_night = 0,
		hours_total = 0,
		average_day = 0,
		average_afternoon = 0,
		average_night = 0,
		average_general = 0;

	if ( !$( '#schedule_amount' ).length ) {
		$( '.tit02' ).eq( 0 ).append( '<div id="schedule_amount" class="schedule_float schedule_padding">Quantidade de viagens</div>' );
		$( '.tit02' ).eq( 1 ).append(
			$( '<div id="schedule_amount_total_text" class="schedule_float schedule_padding"> - Total: </div>' ).append( $( '<div id="schedule_amount_total" class="schedule_float" />' ) ),
			$( '<div id="schedule_amount_night_text" class="schedule_float"> - Noite: </div>' ).append( $( '<div id="schedule_amount_night" class="schedule_float" />' ) ),
			$( '<div id="schedule_amount_afternoon_text" class="schedule_float"> - Tarde: </div>' ).append( $( '<div id="schedule_amount_afternoon" class="schedule_float" />' ) ),
			$( '<div id="schedule_amount_day_text" class="schedule_float">Manhã: </div>' ).append( $( '<div id="schedule_amount_day" class="schedule_float" />' ) )
		);
		$( '.tit02' ).eq( 1 ).parent().parent().next().prepend(
			$( '<div id="schedule_average" class="schedule_float schedule_padding">Média entre as saídas</div>' ), '<br />',
			$( '<div id="schedule_average_general_text" class="schedule_float schedule_padding"> - Geral: </div>' ).append( $( '<div id="schedule_average_general" class="schedule_float" />' ) ),
			$( '<div id="schedule_average_night_text" class="schedule_float"> - Noite: </div>' ).append( $( '<div id="schedule_average_night" class="schedule_float" />' ) ),
			$( '<div id="schedule_average_afternoon_text" class="schedule_float"> - Tarde: </div>' ).append( $( '<div id="schedule_average_afternoon" class="schedule_float" />' ) ),
			$( '<div id="schedule_average_day_text" class="schedule_float">Manhã: </div>' ).append( $( '<div id="schedule_average_day" class="schedule_float" />' ) )
		);
	}

	// Gets the data
	$( '#content table' ).eq( 0 ).find( 'td div' ).each( function( i ) {
		if ( $( this ).html().search( /\d{2}:\d{2}/ ) === -1 )
			return;

		hour_part = $( this ).html().split( ':' );
		current_minutes = parseInt( hour_part[ 0 ] ) * 60 + parseInt( hour_part[ 1 ] );

		if ( i === 3 || !prev_minutes )
			prev_minutes = current_minutes;

		if ( i > 3 ) {
			average_increment = current_minutes < prev_minutes ? 60 - hour_part[ 1 ] + current_minutes : current_minutes - prev_minutes;
			prev_minutes = current_minutes;

			if ( $( this ).parent().attr( 'bgcolor' ) === '#6699CC' )
				average_day += average_increment;
			else if ( $( this ).parent().attr( 'bgcolor' ) === '#eaedf4' )
				average_afternoon += average_increment;
			else
				average_night += average_increment;
		}

		if ( $( this ).parent().attr( 'bgcolor' ) === '#6699CC' )
			hours_day++;
		else if ( $( this ).parent().attr( 'bgcolor' ) === '#eaedf4' )
			hours_afternoon++;
		else
			hours_night++;
	} );

	// Sets the averages
	hours_total = ( hours_day + hours_afternoon + hours_night );
	average_general = average_day + average_afternoon + average_night;
	average_general = hours_total > 2 ? average_general / ( hours_total - 1 ) : average_general;
	average_day = hours_day > 2 ? average_day / ( hours_day - 1 ) : average_day;
	average_afternoon = hours_afternoon > 2 ? average_afternoon / hours_afternoon : average_afternoon;
	average_night = hours_night > 2 ? average_night / hours_night : average_night;

	// Sets the data on screen
	$( '#schedule_amount_day' ).html( hours_day );
	$( '#schedule_amount_afternoon' ).html( hours_afternoon );
	$( '#schedule_amount_night' ).html( hours_night );
	$( '#schedule_amount_total' ).html( hours_total < 0 ? 0 : hours_total );
	$( '#schedule_average_day' ).html( format_time( average_day ) );
	$( '#schedule_average_afternoon' ).html( format_time( average_afternoon ) );
	$( '#schedule_average_night' ).html( format_time( average_night ) );
	$( '#schedule_average_general' ).html( format_time( average_general ) );

	hours_day = hours_afternoon = hours_night = average_day = average_afternoon = average_night = average_general = 0;
}

// Puts the child track number in data callback
// @return {undefined}
function child_set() {
	// Waits the data loads
	var wait_data = setInterval( function() {
		if ( !!$( '#dados tbody tr' ).length )
			clearInterval( wait_data );

		$( '#dados tbody tr' ).each( function( index ) {
			if ( index > 0 )
				$( this ).find( 'td' )[ 0 ].textContent += '-' + /\'(\d{2})\'/.exec( $( this ).html() )[ 1 ];
		} );
	}, 10 );
}

// Main function
// @return {undefined}
function main() {
	var wait_load, wait_modal_load;

	// Enables search with ENTER button and starts child_set() function
	$( '#itemBusca' ).change( function() {
		if ( $( this ).val() == '3' ) {
			$( document ).on( 'keydown click', '#codigoBusca, #consulta_linha img', function( event ) {
				if ( ( event.type === 'keydown' && event.which === 13 )
					|| ( event.type === 'click' && event.target.tagName === 'IMG' )
				) {
					event.preventDefault();
					buscar_codigo( '3' );
					child_set();
				}
			} );
		}

		if ( $( this ).val() == '4' ) {
			$( document ).on( 'keydown', '#linhaBusca', function( event ) {
				if ( ( event.type === 'keydown' && event.which === 13 )
					|| ( event.type === 'click' && event.target.tagName === 'IMG' )
				) {
					event.preventDefault();
					buscar_linha();
					child_set();
				}
			} );
		}
	} );

	$( document ).on( 'click', 'img[alt="Horário"]', function() {
		wait_load = setInterval( function() {
			if ( !!$( '#cboxContent #content' ).length ) {
				clearInterval( wait_load );
				schedule_features();
			}
		}, 10 );
	} );

	$( document ).on( 'click', '#frmHorario img[height="20"]', function() {
		wait_modal_load = setInterval( function() {
			if ( !$( 'img[src="images/load.gif"]' ).length ) {
				clearInterval( wait_modal_load );
				schedule_features();
			}
		}, 10 );
	} );

	$( '#itemBusca' ).find( 'option[value="3"]' ).attr( 'selected', true ).trigger( 'change' );
	change_busca();
}

// Inits
$( main );

}( jQuery ) );