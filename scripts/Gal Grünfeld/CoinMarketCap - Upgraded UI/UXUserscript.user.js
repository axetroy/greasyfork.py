// ==UserScript==
// @name         CoinMarketCap - Upgraded UI/UXUserscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Improves the user interface & user experience of CoinMarketCap
// @author       Gal Grünfeld
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://coinmarketcap.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

	//Materialize
	$('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>');
	$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">');

	//Icons
  	$('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');

	//Remove commercials
	$('#site_style-css').remove();
	$('#icobanner-wrapper').remove();
	$('.col-lg-2.hidden-xs.hidden-sm.hidden-md').remove();
	$('#leaderboard').remove();
	$('#leaderboard-bottom').remove();


	$('.col-lg-10').removeClass('col-lg-10');


	$('button').addClass('waves-effect waves-light');

	$('[data-currency-display], [data-currency-toggle], .price-toggle[data-currency], #currency-switch-button [data-currency-name]').text(function () {
		var data_currency_symbol = $(this).text();
		$(this).wrapInner('<span data-currency-name></span>');
		if(data_currency_symbol == 'USD') {
			$(this).prepend('<svg data-currency-icon style="width:24px;height:24px" viewBox="0 0 24 24"> \
    			<path fill="'+$('[data-currency-toggle]').css('color')+'" d="M11.8,10.9C9.53,10.31 8.8,9.7 8.8,8.75C8.8,7.66 9.81,6.9 11.5,6.9C13.28,6.9 13.94,7.75 14,9H16.21C16.14,7.28 15.09,5.7 13,5.19V3H10V5.16C8.06,5.58 6.5,6.84 6.5,8.77C6.5,11.08 8.41,12.23 11.2,12.9C13.7,13.5 14.2,14.38 14.2,15.31C14.2,16 13.71,17.1 11.5,17.1C9.44,17.1 8.63,16.18 8.5,15H6.32C6.44,17.19 8.08,18.42 10,18.83V21H13V18.85C14.95,18.5 16.5,17.35 16.5,15.3C16.5,12.46 14.07,11.5 11.8,10.9Z" /> \
			</svg>');
		}
		if(data_currency_symbol == 'EUR') {
			$(this).prepend('<svg data-currency-icon style="width:24px;height:24px" viewBox="0 0 24 24"> \
				<path fill="'+$('[data-currency-toggle]').css('color')+'" d="M7.07,11L7,12L7.07,13H17.35L16.5,15H7.67C8.8,17.36 11.21,19 14,19C16.23,19 18.22,17.96 19.5,16.33V19.12C18,20.3 16.07,21 14,21C10.08,21 6.75,18.5 5.5,15H2L3,13H5.05L5,12L5.05,11H2L3,9H5.5C6.75,5.5 10.08,3 14,3C16.5,3 18.8,4.04 20.43,5.71L19.57,7.75C18.29,6.08 16.27,5 14,5C11.21,5 8.8,6.64 7.67,9H19.04L18.19,11H7.07Z" /> \
			</svg>');
		}
		//need icon for DKK
		if(data_currency_symbol == 'JPY') {
			$(this).prepend('<svg data-currency-icon style="width:24px;height:24px" viewBox="0 0 24 24"> \
				<path fill="'+$('[data-currency-toggle]').css('color')+'" d="M11,21V16H6V14H11V13.71L10.16,12H6V10H9.19L5.77,3H8L12,11.2L16,3H18.23L14.81,10H18V12H13.84L13,13.71V14H18V16H13V21H11Z" /> \
			</svg>');
		}
});


	$('[data-currency] svg path').css({
		fill: $('[data-currency] svg').css('color'),
	});




	$('#title').css({
		'margin-top': 'unset',
	});

	$('h1#title a').css({
		'text-decoration': 'none',
	});

	$('table#currencies').attr('id', '_currencies');

	$('table').removeClass();
	$('table').addClass('bordered highlight');

	$('.negative_change').wrapInner('<span class="negative_change_percent"></span>');
	$('.negative_change_percent').wrap('<span style="display: flex; align-items: center; justify-content: space-evenly;"></span>');
	$('.negative_change_percent').before('<i class="material-icons">trending_down</i>');

	$('.positive_change').wrapInner('<span class="positive_change_percent"></span>');
	$('.positive_change_percent').wrap('<span style="display: flex; align-items: center; justify-content: space-evenly;"></span>');
	$('.positive_change_percent').before('<i class="material-icons">trending_up</i>');

	$('.sparkline').css({ //currencies graphs on the main page
		'border': '0',
		'border-left': '1px solid #E0E0E0',
		'border-bottom': '1px solid #E0E0E0'
	});



/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */