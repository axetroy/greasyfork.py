/* global $: true */
/* global unsafeWindow: true */

// ==UserScript==
// @name        Geocaching.com + GeoLeaks
// @namespace   geoleaks
// @version     1.7
// @author      Toni Cornelissen (github@technetium.be)
// @author      Michel ten Voorde (michel@tenvoorde.org)
// @description Add link to geoleaks.com on geocache pages see also: https://geoleaks.com/forum/showthread.php?tid=25207
// @supportURL  https://geoleaks.com/forum/showthread.php?tid=25207
// @require     https://greasyfork.org/scripts/38445-monkeyconfig/code/MonkeyConfig.js
// @include     http://www.geocaching.com/geocache/*
// @include     https://www.geocaching.com/geocache/*
// @include     https://geoleaks.com/forum/newthread.php?*
// @include     https://geoleaks.com/forum/search.php*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @grant       GM_addStyle
// ==/UserScript==
// @require     https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js


(function() {
	'use strict';

	var buttonInfo = {
		error: {
			color: '#cc3399',
			colorHigh: '#ff66cc',
			text: 'Error!'
		},
		notfound: {
			color: '#90040b',
			colorHigh: '#cc0000',
			text: 'Ask on GeoLeaks'
		},
		solved: {
			color: '#02874d',
			colorHigh: '#00b265',
			text: 'Solved on GeoLeaks'
		},
		unknown: {
			color: '#12508c',
			colorHigh : '#0000ff',
			text: 'Found on GeoLeaks'
		},
		unsolved: {
			color: '#e98300',
			colorHigh : '#ffcc00',
			text: 'Solving on GeoLeaks'
		},
		wait: {
			color: '#cdcdcd',
			colorHigh : '#eeeeee',
			text: 'Searching on GeoLeaks'
		}
		// dnf: '#1c3d4c' ,
		// virtual: '#009bbb',
	};

	var regions = {
		// Netherlands
		'Groningen, Netherlands': { fid : 12 },
		'Friesland, Netherlands': { fid : 13 },
		'Drenthe, Netherlands': { fid : 14 },
		'Overijssel, Netherlands': { fid : 15 },
		'Flevoland, Netherlands': { fid : 16 },
		'Gelderland, Netherlands': { fid : 17 },
		'Utrecht, Netherlands': { fid : 18 },
		'Noord-Holland, Netherlands': { fid : 19 },
		'Zuid-Holland, Netherlands': { fid : 20 },
		'Zeeland, Netherlands': { fid : 21 },
		'Noord-Brabant, Netherlands': { fid : 22 },
		'Limburg, Netherlands': { fid : 23 },

		// Belgium
		'Brussels, Belgium': { fid : 41 },
		'Antwerpen, Belgium': { fid : 42 },
		'Limburg, Belgium': { fid : 43 },
		'West-Vlaanderen, Belgium': { fid : 44 },
		'Oost-Vlaanderen, Belgium': { fid : 45 },
		'Vlaams-Brabant, Belgium': { fid : 46 },
		'Brabant wallon, Belgium': { fid : 47 },
		'Hainaut, Belgium': { fid : 48 },
		'Liège, Belgium': { fid : 49 },
		'Luxembourg, Belgium': { fid : 50 },
		'Namur, Belgium': { fid : 51 },

		// Germany
		'Bremen, Germany': { fid : 98 },
		'Hamburg, Germany': { fid : 99 },
		'Niedersachsen, Germany': { fid : 100 },
		'Nordrhein-Westfalen, Germany': { fid : 101 },
		'Hessen, Germany': { fid : 102 },
		'Rheinland-Pfalz, Germany': { fid : 103 },
		'Saarland, Germany': { fid : 104 },
		'Schleswig-Holstein, Germany': { fid : 105 },
		'Mecklenburg-Vorpommern, Germany': { fid : 106 },
		'Brandenburg, Germany': { fid : 107 },
		'Berlin, Germany': { fid : 108 },
		'Sachsen-Anhalt, Germany': { fid : 109 },
		'Thüringen, Germany': { fid : 110 },
		'Sachsen, Germany': { fid : 111 },
		'Baden-Württemberg, Germany': { fid : 112 },
		'Bayern, Germany': { fid : 113 },

		// Europe
		'Luxembourg': { fid : 66 },
		'France': { fid : 68 },
		'United Kingdom': { fid : 87 },

		'Aland Islands': { fid : 69, cc : 'AX' },
		'Andorra': { fid : 69, cc : 'AD' },
		'Armenia' : { fid : 69, cc : 'AM' },
		'Austria' : { fid : 69, cc : 'AT' },
		'Azerbaijan' : { fid : 69, cc : 'AZ' },
		'Bosnia and Herzegovina' : { fid : 69, cc : 'BA' },
		'Bulgaria' : { fid : 69, cc : 'BG' },
		'Croatia' : { fid : 69, cc : 'HR' },
		'Cyprus' : { fid : 69, cc : 'CY' },
		'Czechia' : { fid : 69, cc : 'CZ' },
		'Denmark' : { fid : 69, cc : 'DK' },
		'Estonia' : { fid : 69, cc : 'EE' },
		'Faroe Islands' : { fid : 69, cc : 'FO' },
		'Finland' : { fid : 69, cc : 'FI' },
		'Greece' : { fid : 69, cc : 'GR' },
		'Hungary' : { fid : 69, cc : 'HU' },
		'Iceland' : { fid : 69, cc : 'IS' },
		'Ireland' : { fid : 69, cc : 'IE' },
		'Italy' : { fid : 69, cc : 'IT' },
		'Jersey' : { fid : 69, cc : 'JE' },
		'Latvia' : { fid : 69, cc : 'LV' },
		'Liechtenstein' : { fid : 69, cc : 'LI' },
		'Lithuania' : { fid : 69, cc : 'LT' },
		'Norway' : { fid : 69, cc : 'NO' },
		'Poland' : { fid : 69, cc : 'PL' },
		'Portugal' : { fid : 69, cc : 'PT' },
		'Romania' : { fid : 69, cc : 'RO' },
		'Russia' : { fid : 69, cc : 'RU' },
		'Slovakia' : { fid : 69, cc : 'SK' },
		'Slovenia' : { fid : 69, cc : 'SI' },
		'Spain' : { fid : 69, cc : 'ES' },
		'Sweden' : { fid : 69, cc : 'SE' },
		'Switzerland' : { fid : 69, cc : 'CH' },
		'Vatican City State' : { fid : 69, cc : 'VA' },

		// United States
		'Alabama, United States': { fid : 88, cc : 'AL' },
		'Alaska, United States': { fid : 88, cc : 'AK' },
		'Arizona, United States' : { fid : 88, cc : 'AZ' },
		'Arkansas, United States' : { fid : 88, cc : 'AR' },
		'California, United States' : { fid : 88, cc : 'CA' },
		'Colorado, United States' : { fid : 88, cc : 'CO' },
		'Connecticut, United States' : { fid : 88, cc : 'CT' },
		'Delaware, United States' : { fid : 88, cc : 'DE' },
		'District of Columbia, United States' : { fid : 88, cc : 'DC' },
		'Florida, United States' : { fid : 88, cc : 'FL' },
		'Georgia, United States' : { fid : 88, cc : 'GA' },
		'Hawaii, United States' : { fid : 88, cc : 'HI' },
		'Idaho, United States' : { fid : 88, cc : 'ID' },
		'Illinois, United States' : { fid : 88, cc : 'IL' },
		'Indiana, United States' : { fid : 88, cc : 'IN' },
		'Iowa, United States' : { fid : 88, cc : 'IA' },
		'Kansas, United States' : { fid : 88, cc : 'KS' },
		'Kentucky, United States' : { fid : 88, cc : 'KY' },
		'Louisiana, United States' : { fid : 88, cc : 'LA' },
		'Maine, United States' : { fid : 88, cc : 'ME' },
		'Maryland, United States' : { fid : 88, cc : 'MD' },
		'Massachusetts, United States' : { fid : 88, cc : 'MA' },
		'Michigan, United States' : { fid : 88, cc : 'MI' },
		'Minnesota, United States' : { fid : 88, cc : 'MN' },
		'Mississippi, United States' : { fid : 88, cc : 'MS' },
		'Missouri, United States' : { fid : 88, cc : 'MO' },
		'Montana, United States' : { fid : 88, cc : 'MT' },
		'Nebraska, United States' : { fid : 88, cc : 'NE' },
		'Nevada, United States' : { fid : 88, cc : 'NV' },
		'New Hampshire, United States' : { fid : 88, cc : 'NH' },
		'New Jersey, United States' : { fid : 88, cc : 'NJ' },
		'New Mexico, United States' : { fid : 88, cc : 'NM' },
		'New York, United States' : { fid : 88, cc : 'NY' },
		'North Carolina, United States' : { fid : 88, cc : 'NC' },
		'North Dakota, United States' : { fid : 88, cc : 'ND' },
		'Ohio, United States' : { fid : 88, cc : 'OH' },
		'Oklahoma, United States' : { fid : 88, cc : 'OK' },
		'Oregon, United States' : { fid : 88, cc : 'OR' },
		'Pennsylvania, United States' : { fid : 88, cc : 'PA' },
		'Rhode Island, United States' : { fid : 88, cc : 'RI' },
		'South Carolina, United States' : { fid : 88, cc : 'SC' },
		'South Dakota, United States' : { fid : 88, cc : 'SD' },
		'Tennessee, United States' : { fid : 88, cc : 'TN' },
		'Texas, United States' : { fid : 88, cc : 'TX' },
		'Utah, United States' : { fid : 88, cc : 'UT' },
		'Vermont, United States' : { fid : 88, cc : 'VT' },
		'Virginia, United States' : { fid : 88, cc : 'VA' },
		'Washington, United States' : { fid : 88, cc : 'WA' },
		'West Virginia, United States' : { fid : 88, cc : 'WV' },
		'Wisconsin, United States' : { fid : 88, cc : 'WI' },
		'Wyoming, United States' : { fid : 88, cc : 'WY' }, 
		
		
		'default' : { fid : 70 }
	};

	const GCTYPE_Traditional = 2;
	const GCTYPE_Multi = 3;
	const GCTYPE_Virtual = 4;
	const GCTYPE_Letterbox = 5;
	const GCTYPE_Mystery = 8;
	const GCTYPE_Earthcache = 137;
	const GCTYPE_Wherigo = 1858;
	
	const LOGTYPE_Found = 2;
	const LOGTYPE_Did_not_found = 3;
	
	var gctypes = [];
	gctypes[GCTYPE_Traditional] = { fid : 38 };
	gctypes[GCTYPE_Multi] = { fid : 38 };
	gctypes[GCTYPE_Virtual] = { fid : 77 };
	gctypes[GCTYPE_Letterbox] = { fid : 38 };
		// 'Event Cache
		// 'Unknown Cache
		// 'Project APE Cache
		// 'Webcam Cache
		// 'Cache In Trash Out Event
	gctypes[GCTYPE_Earthcache] = { fid : 77 };
		// 'Mega-Event Cache
		// 'GPS Adventures Exhibit
	gctypes[GCTYPE_Wherigo] = { fid : 38 };
		// 'Lost and Found Event Cache
		// 'Groundspeak HQ
		// 'Groundspeak Lost and Found Celebration
		// 'Groundspeak Block Party
		// 'Giga-Event Cache


	var cfg = new MonkeyConfig({
		title: 'Geocaching + Geoleaks Configuration',
		menuCommand: true,
		params: {
		    open_in_new_window: {
		        type: 'checkbox',
		        default: false
		    },
		}
	});

	var gccode = '';
	var gcname = '';
	var gctype = 0;
	var logtype = 0;
	var region = '';
	var coords = '';
	var wait = 5000;
	var link_id = '#linkToGeoLeaks';
	var form_id = '#formToGeoLeaks';

	function setInputFields() {
		var params = new URLSearchParams(window.location.search);
		for (var param of params) {
			var elems = document.getElementsByName(param[0]);
			for (var elem of elems) {
				switch (elem.nodeName) {
					case 'TEXTAREA' : elem.innerHTML = param[1]; elem.value = param[1]; break; 
					default : elem.value = param[1]; break; 
				}
			}
		}
	}

	function updateButton(type) {
		$(link_id)
			.css('background-color', buttonInfo[type][$(link_id).data('colorState')])
			.css('border-color', buttonInfo[type][$(link_id).data('colorState')])
			.data('color', buttonInfo[type].color) 
			.data('colorHigh', buttonInfo[type].colorHigh) 
			.html(buttonInfo[type].text)
		;
	}

	function setHref(href) {
		$(link_id)
			.attr('href', href)
			.attr('target', cfg.get('open_in_new_window') && !href.startsWith('#') ? '_blank' : '_self')
		;
	}

	function newMessageUrl() {
		var forumInfo = regions.default;
		if (gctypes[gctype]) { forumInfo = gctypes[gctype]; }
		else {
			for (var key in regions) {
				if (region.endsWith(key)) {
					forumInfo = regions[key];
					break;
				}
				console.debug('Region:' + region);
			}
		}
		var subject = gccode + ' ' + gcname;
		if (forumInfo.cc) { subject += ' (' + forumInfo.cc + ')'; }
		var message =
			'https://coord.info/' + gccode + "\n" +
			"\n" +
			'https://greasyfork.org/en/scripts/376355-geocaching-com-geoleaks ' + "\n" +
			"\n" +
			'geeft aan dat er nog geen topic voor deze cache is, ' +
			'ik kom er niet uit. ' +
			'Wie wil mij helpen? ' + "\n" +
			'Ik heb het volgende al geprobeerd:' + "\n" + 
			"\n";
		return '' +
			'https://geoleaks.com/forum/newthread.php?fid=' + forumInfo.fid +
			'&subject=' + encodeURIComponent(subject) +
			'&message_new=' + encodeURIComponent(message) +
			'&message=' + encodeURIComponent(message)
		;
	}
	
	function checkGeoleaks() {
		updateButton('wait');
		$.post({
			url: "https://geoleaks.com/forum/search.php",
			data: {
				'action' : 'do_search',
				'keywords' : gccode,
				'postthread' : 2, // Alleen titels doorzoeken
				'sortby' : 'lastpost',
				'sortordr' : 'asc',
			},
			success: function(result){
				var url = result.match(/search.\php\?action=results[^"]*/);
				if (!url) {
					if (-1 !== result.indexOf('<td class="trow1">Er zijn geen resultaten gevonden voor de zoekopdracht die u uitvoerde. Maak een nieuwe zoekopdracht en probeer het opnieuw.</td>')) {
						updateButton('notfound');
						setHref(newMessageUrl());
						return;
					}
					if (-1 !== result.indexOf('<td class="trow1">U kunt slechts &eacute;&eacute;n zoekopdracht per 10 seconden uitvoeren. Wacht')) {
						wait = wait * 2;
						window.setTimeout(checkGeoleaks, wait);
						return;
					}

					console.error('Cannot find results url');
					console.debug(result);
					updateButton('error');
					setHref('#search');
					return;
				}
				url = url[0].replace('&amp;', '&');
				$.get({
					url: 'https://geoleaks.com/forum/' + url,
					success: function(result){
						var post = result.match(/showthread\.php.*?highlight[^"]*/);
						if (post) {
							post = post[0].replace('&amp;', '&');
							setHref('https://geoleaks.com/forum/' + post);
							var forum = result
								.match(/forumdisplay.php.*?<\/a>/)[0]
								.match(/[^>]*<\/a>/)[0]	
								.toLowerCase()
							;
							if (forum.startsWith('opgeloste ')) {
								updateButton('solved');
							} else if (forum.startsWith('niet opgeloste ')) {
								updateButton('unsolved');
							} else {
								updateButton('unknown');
							}
						} else {
							updateButton('notfound');
							setHref(newMessageUrl());
						}
					},
					error: function() {
						updateButton('error');
						setHref('https://geoleaks.com/forum/search.php?action=do_search&keywords='+gccode);
					}
				});
			},
			error: function() {
				updateButton('error');
				setHref('https://geoleaks.com/forum/search.php?action=do_search&keywords='+gccode);
			}
		});
	}

	function geocaching() {
		gccode = $('#ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').html();
		gcname = $('#ctl00_ContentBody_CacheName').html();
		gctype = Number(
			$('a[href="/about/cache_types.aspx"] use')
				.attr('xlink:href')
				.replace('-disabled', '')
				.replace('/app/ui-icons/sprites/cache-types.svg#icon-', '')
		);
		var logimage = $('img#ctl00_ContentBody_GeoNav_logTypeImage');
		console.log(logimage);
		if (logimage.length) {
			logtype = Number(
				logimage
					.attr('src')
					.replace('.png', '')
					.replace('/images/logtypes/48/', '')
			);
		}
		console.log(logtype);
		region = $('#ctl00_ContentBody_Location').html().replace('</a>', '');
		coords = $('span.myLatLon').html();

		if (-1 === [
			GCTYPE_Traditional,
			GCTYPE_Multi,
			GCTYPE_Virtual,
			GCTYPE_Letterbox,
			GCTYPE_Mystery,
			GCTYPE_Earthcache,
			GCTYPE_Wherigo,
		].indexOf(gctype)) {
			console.debug('No Usefull type: ' + gctype);
			return;
		}
		
		$('#ctl00_ContentBody_GeoNav_logButton').after('<a id="' + link_id.substr(1) + '" class="btn btn-primary" data-color="#009bbb" data-color-high="#00ccff" data-color-state="color" style="margin-top: 14px; background-color: #009bbb; border-color: #009bbb" onmouseenter="$(\''+link_id+'\').css(\'background-color\', $(\''+link_id+'\').data(\'colorHigh\')).css(\'border-color\', $(\''+link_id+'\').data(\'colorHigh\')).data(\'colorState\', \'colorHigh\')" onmouseout="$(\''+link_id+'\').css(\'background-color\', $(\''+link_id+'\').data(\'color\')).css(\'border-color\', $(\''+link_id+'\').data(\'color\')).data(\'colorState\', \'color\')">GeoLeaks</a>');
		if (
			(GCTYPE_Mystery === gctype) &&
			(LOGTYPE_Found !== logtype) &&
			(!coords) &&
			(-1 === gcname.toLowerCase().indexOf('bonus')) &&
			(-1 === gcname.toLowerCase().indexOf('challenge'))
		) {
			checkGeoleaks();		
		}		
		$(link_id).click(function() {
			var href = $(link_id).attr('href');
			if (href) {
				if ('#search' === href) {
					var form = $(form_id);
					if (0 === form.length) {
						form = $('<form />', {
							'method': 'post',
							'target': cfg.get('open_in_new_window') ? '_blank' : '_self',
							'action': 'https://geoleaks.com/forum/search.php'
						}).append(
							$('<input />', { 'name' : 'action', 'value' : 'do_search' }),
							$('<input />', { 'name' : 'keywords', 'value' : gccode }),
							$('<input />', { 'name' : 'postthread', 'value' : 2 })
						)
							.css('display', 'none')
							.appendTo($(document.body))
						;
					}
					form.submit();
					return false;
				}
				return true;
			}
			checkGeoleaks();
		});
	}
	if (window.top == window.self) {
		switch (window.location.hostname) {
			case 'www.geocaching.com' : geocaching(); break;
			case 'geoleaks.com' : setInputFields(); break;
			default : console.error('Unknown hostname: ' + window.location.hostname); break;
		}
	}
}());
