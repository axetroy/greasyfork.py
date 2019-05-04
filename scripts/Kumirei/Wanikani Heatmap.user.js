// ==UserScript==
// @name         Wanikani Heatmap
// @namespace    http://tampermonkey.net/
// @version      1.7.7
// @description  Adds review heatmaps to the dashboard.
// @author       Kumirei
// @match        https://www.wanikani.com/
// @match        https://www.wanikani.com/dashboard
// @grant        none
// ==/UserScript==

(function($, wkof) {
		//-----------------------------------------------------------------------------------------------------------------------------------------------------//
		//-------------------------------------------------------------------INITIALIZATION--------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------------------------------------------------------------------------//

		var data_storage_key = 'WKheatmapData1.7.0';
		var stored_data;
		var is_dark = is_dark_theme();
		const ms_day = 24*60*60*1000;

		// Make sure WKOF is installed
		if (!wkof) {
				var response = confirm('WaniKani Heatmap requires WaniKani Open Framework.\n Click "OK" to be forwarded to installation instructions.');
				if (response) window.location.href = 'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
				return;
		}
		else {
				add_dependencies();
				add_css();
				wkof.include('Menu,Settings,ItemData,Apiv2');

				// Install menu
				wkof.ready('Menu,Settings').then(load_settings).then(install_menu);

				// Fetch review info and create heatmaps
				wkof.ready("Apiv2").then(function(){
						stored_data = JSON.parse(localStorage.getItem(data_storage_key));
						if (!stored_data) stored_data = {};
						wkof.Apiv2.fetch_endpoint('reviews', {filters: {updated_after: (stored_data.review_data ? stored_data.review_data.last_date : "1970-01-01T00:00:00.000Z")}})
								.then(store_review_data)
								.then(register_lesson_filter)
								.then(store_lesson_data)
								.then(update_level_ups)
								.then(add_heatmaps);
				});
		}

		//-----------------------------------------------------------------------------------------------------------------------------------------------------//
		//----------------------------------------------------------------------SETTINGS-----------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------------------------------------------------------------------------//

		// Load stored settings or set defaults
		function load_settings() {
				var defaults = {
						general: {
								week_start: (((new Date).getTimezoneOffset()/60 > 3) ? "false" : "true"),
								reverse_years: false,
								dashboard_intervals: false,
								segment_year: true,
								level_ups: true,
								level_ups_color: is_dark ? '#ffffff' : '#000000',
								today: true,
								today_color: '#ff0000',
								highlight_color: '#ff0000'
						},
						reviews: {
								custom_colors: true,
								color1: "#dae289",
								color2: "#9cc069",
								color3: "#669d45",
								color4: "#637939",
								color5: "#3b6427",
								interval1: 50,
								interval2: 100,
								interval3: 200,
								interval4: 400},
						lessons: {
								custom_colors: true,
								color1: "#dae289",
								color2: "#9cc069",
								color3: "#669d45",
								color4: "#637939",
								color5: "#3b6427",
								interval1: 5,
								interval2: 10,
								interval3: 20,
								interval4: 40,
								count_zero: false
						},
						collapsed: {
								reviews: {},
								lessons: {}
						},
						visible_heatmap: 'reviews'
				};
				wkof.Settings.load('wanikani_heatmap', defaults).then(add_setting_css);
		}

		// Installs the options button in the menu
		function install_menu() {
				var config = {
						name: 'wanikani_heatmap_settings',
						submenu: 'Settings',
						title: 'Heatmap',
						on_click: open_settings
				};
				wkof.Menu.insert_script_link(config);
		}

		// Creates the options
		function open_settings(items) {
				var config = {
						script_id: 'wanikani_heatmap',
						title: 'Heatmap',
						on_change: check_reload,
						on_save: update_settings,
						content: {
								tabs: {
										type: 'tabset',
										content: {
												general: {
														type: 'page',
														label: 'General',
														hover_tip: 'Settings pertaining to the general functions of the script.',
														content: {
																general_group: {
																		type: 'group',
																		label: 'General',
																		content: {
																				week_start: {
																						type: 'dropdown',
																						label: 'First day of the week',
																						default: (((new Date).getTimezoneOffset()/60 > 3) ? false : true),
																						hover_tip: 'Start the week on the selected day.',
																						content: {true: "Monday", false: "Sunday"},
																						path: '@general.week_start'
																				},
																				reverse_years: {
																						type: 'checkbox',
																						label: 'Reverse year order',
																						default: false,
																						hover_tip: 'Puts the most recent years on the bottom instead of the top.',
																						path: '@general.reverse_years'
																				},
																				dashboard_intervals: {
																						type: 'checkbox',
																						label: 'Display intervals',
																						default: false,
																						hover_tip: 'Display intervals on the dashboard.',
																						path: '@general.dashboard_intervals'
																				},
																				segment_year: {
																						type: 'checkbox',
																						label: 'Segment year',
																						default: true,
																						hover_tip: 'If this is checked then months will display as segments.',
																						path: '@general.segment_year'
																				}
																		}
																},
																indicators_group: {
																		type: 'group',
																		label: 'Indicators',
																		content: {
																				level_ups: {
																						type: 'checkbox',
																						label: 'Show level-up indicators',
																						default: true,
																						hover_tip: 'Puts borders around the days you leveled up',
																						path: '@general.level_ups'
																				},
																				level_ups_color: {
																						type: 'color',
																						label: 'Color for level-up indicators',
																						hover_tip: 'The borders around the days you leveled up will have this color.',
																						default: is_dark ? '#ffffff' : '#000000',
																						path: '@general.level_ups_color',
																						on_change: update_label
																				},
																				divider: {
																						type: 'divider'
																				},
																				today: {
																						type: 'checkbox',
																						label: 'Show current day indicator',
																						default: true,
																						hover_tip: 'Puts borders around the current day',
																						path: '@general.today'
																				},
																				today_color: {
																						type: 'color',
																						label: 'Color for current day indicator',
																						hover_tip: 'The borders around today will have this color.',
																						default: '#ff0000',
																						path: '@general.today_color',
																						on_change: update_label
																				}/*,
																				divider2: {
																						type: 'divider'
																				},
																				highlight_color: {
																						type: 'color',
																						label: 'Interval highlight color',
																						hover_tip: 'Days selected to show interval stats will be highlighted with this color.',
																						default: '#ff0000',
																						path: '@general.highlight_color',
																						on_change: update_label
																				}*/
																		}
																}
														}
												},
												reviews: {
														type: 'page',
														label: 'Reviews',
														hover_tip: 'Settings pertaining to the review heatmaps.',
														content: {
																colors: {
																		type: 'group',
																		label: 'Colors',
																		content: {
																				reviews_custom_colors: {
																						type: 'checkbox',
																						label: 'Use these colors',
																						default: true,
																						hover_tip: 'If unticked the default colors will be used',
																						path: '@reviews.custom_colors'
																				},
																				reviews_color1: {
																						type: 'color',
																						label: 'Start color',
																						hover_tip: 'This color defines the start of the color gradient used in the review heatmaps.',
																						default: '#dae289',
																						path: '@reviews.color1',
																						on_change: update_label
																				},
																				reviews_color2: {
																						type: 'color',
																						label: 'Color 2',
																						hover_tip: 'This color defines the second color in the gradient used in the review heatmaps.',
																						default: '#9cc069',
																						path: '@reviews.color2',
																						on_change: update_label
																				},
																				reviews_color3: {
																						type: 'color',
																						label: 'Color 3',
																						hover_tip: 'This color defines the third color in the gradient used in the review heatmaps.',
																						default: '#669d45',
																						path: '@reviews.color3',
																						on_change: update_label
																				},
																				reviews_color4: {
																						type: 'color',
																						label: 'Color 4',
																						hover_tip: 'This color defines the fourth color in the gradient used in the review heatmaps.',
																						default: '#637939',
																						path: '@reviews.color4',
																						on_change: update_label
																				},
																				reviews_color5: {
																						type: 'color',
																						label: 'End color',
																						hover_tip: 'This color defines the end of the color gradient used in the review heatmaps.',
																						default: '#3b6427',
																						path: '@reviews.color5',
																						on_change: update_label
																				},
																				divider: {
																						type: 'divider'
																				},
																				reviews_generate_colors: {
																						type: 'button',
																						label: 'Generate from start and end',
																						hover_tip: 'Click this to generate the middle colors from your choice of start and end colors.',
																						on_click: generate_colors
																				}
																		}
																},
																intervals: {
																		type: 'group',
																		label: 'Intervals',
																		content: {
																				reviews_interval1: {
																						type: 'number',
																						label: 'End of interval 1',
																						hover_tip: 'First interval goes from 1 to this number',
																						default: 50,
																						path: '@reviews.interval1'
																				},
																				reviews_interval2: {
																						type: 'number',
																						label: 'End of interval 2',
																						hover_tip: 'Second interval goes from previous number+1 to this number',
																						default: 100,
																						path: '@reviews.interval2'
																				},
																				reviews_interval3: {
																						type: 'number',
																						label: 'End of interval 3',
																						hover_tip: 'Third interval goes from previous number+1 to this number',
																						default: 200,
																						path: '@reviews.interval3'
																				},
																				reviews_interval4: {
																						type: 'number',
																						label: 'End of interval 4',
																						hover_tip: 'Fourth interval goes from previous number+1 to this number, and fifth from this number and up',
																						default: 400,
																						path: '@reviews.interval4'
																				}
																		}
																},
																reset: {
																		type: 'group',
																		label: 'Reload',
																		content: {
																				review_reset: {
																						type: 'button',
																						label: 'Reload review data',
																						text: 'Reload',
																						hover_tip: 'Reloads all the stored review data so that it\'s fetched again upon refresh',
																						full_width: false,
																						on_click: reset_data
																				}
																		}
																}
														}
												},
												lessons: {
														type: 'page',
														label: 'Lessons',
														hover_tip: 'Settings pertaining to the lesson heatmaps.',
														content: {
																colors: {
																		type: 'group',
																		label: 'Colors',
																		content: {
																				lessons_custom_colors: {
																						type: 'checkbox',
																						label: 'Use these colors',
																						default: true,
																						hover_tip: 'If unticked the default colors will be used',
																						path: '@lessons.custom_colors'
																				},
																				lessons_color1: {
																						type: 'color',
																						label: 'Start color',
																						hover_tip: 'This color defines the start of the color gradient used in the lesson heatmaps.',
																						default: '#dae289',
																						path: '@lessons.color1',
																						on_change: update_label
																				},
																				lessons_color2: {
																						type: 'color',
																						label: 'Color 2',
																						hover_tip: 'This color defines the second color in the gradient used in the lesson heatmaps.',
																						default: '#9cc069',
																						path: '@lessons.color2',
																						on_change: update_label
																				},
																				lessons_color3: {
																						type: 'color',
																						label: 'Color 3',
																						hover_tip: 'This color defines the third color in the gradient used in the lesson heatmaps.',
																						default: '#669d45',
																						path: '@lessons.color3',
																						on_change: update_label
																				},
																				lessons_color4: {
																						type: 'color',
																						label: 'Color 4',
																						hover_tip: 'This color defines the fourth color in the gradient used in the lesson heatmaps.',
																						default: '#637939',
																						path: '@lessons.color4',
																						on_change: update_label
																				},
																				lessons_color5: {
																						type: 'color',
																						label: 'End color',
																						hover_tip: 'This color defines the end of the color gradient used in the lesson heatmaps.',
																						default: '#3b6427',
																						path: '@lessons.color5',
																						on_change: update_label
																				},
																				divider: {
																						type: 'divider'
																				},
																				lessons_generate_colors: {
																						type: 'button',
																						label: 'Generate from start and end',
																						hover_tip: 'Click this to generate the middle colors from your choice of start and end colors.',
																						on_click: generate_colors
																				}
																		}
																},
																intervals: {
																		type: 'group',
																		label: 'Intervals',
																		content: {
																				lessons_interval1: {
																						type: 'number',
																						label: 'End of interval 1',
																						hover_tip: 'First interval goes from 1 to this number',
																						default: 5,
																						path: '@lessons.interval1'
																				},
																				lessons_interval2: {
																						type: 'number',
																						label: 'End of interval 2',
																						hover_tip: 'Second interval goes from previous number+1 to this number',
																						default: 10,
																						path: '@lessons.interval2'
																				},
																				lessons_interval3: {
																						type: 'number',
																						label: 'End of interval 3',
																						hover_tip: 'Third interval goes from previous number+1 to this number',
																						default: 20,
																						path: '@lessons.interval3'
																				},
																				lessons_interval4: {
																						type: 'number',
																						label: 'End of interval 4',
																						hover_tip: 'Fourth interval goes from previous number+1 to this number, and fifth from this number and up',
																						default: 40,
																						path: '@lessons.interval4'
																				}
																		}
																},
																streak: {
																		type: 'group',
																		label: 'Streak',
																		content: {
																				count_zero: {
																						type: 'checkbox',
																						label: 'Count zero lesson days',
																						hover_tip: 'Count days with lessons done but also none to do, towards the streak',
																						default: false,
																						on_change: ()=>{delete stored_data.lesson_data; localStorage.setItem(data_storage_key, JSON.stringify(stored_data));},
																						path: '@lessons.count_zero'
																				}
																		}
																},
																reset: {
																		type: 'group',
																		label: 'Reload',
																		content: {
																				lesson_reset: {
																						type: 'button',
																						label: 'Reload lesson data',
																						text: 'Reload',
																						hover_tip: 'Reloads all the stored lesson data so that it\'s fetched again upon refresh',
																						full_width: false,
																						on_click: reset_data
																				}
																		}
																}
														}
												}
										}
								}
						}
				}

				var dialog = new wkof.Settings(config);
				config.content.tabs.content.reviews.content.colors.content.reviews_generate_colors.dialog = dialog;
				config.content.tabs.content.lessons.content.colors.content.lessons_generate_colors.dialog = dialog;
				need_reload = false;
				dialog.open();
				add_color_codes();
		}

		// Adds labels to color inputs
		function add_color_codes() {
				$('.wkof_settings input[type="color"]').each((i, e)=>{
						e.parentElement.style.position = "relative";
						var color = e.value;
						var text_color = contrast_color(color);
						var label = $('<input class="color_label" style="color:'+text_color+' !important"></input>')[0];
						label.value = color;
						label.onkeyup = (event)=>{
								var hex = event.target.value;
								if (validate_hex(hex)) {
										e.value = hex;
										update_label(e.name, hex);
										var name = e.name.replace(/reviews_|lessons_/,'');
										wkof.settings.wanikani_heatmap[$('#wkofs_wanikani_heatmap .ui-tabs-active')[0].innerText.toLowerCase()][name] = hex;
								}
						}
						$(e).before(label);
				});
		}

		var need_reload;
		// Determines whether the page will need to be reloaded once the new settings are saved
		function check_reload(name, val) {
				if (need_reload) return;
				if (('week_start'+
					 'segment_year'+
					 'reviews_interval1'+
					 'reviews_interval2'+
					 'reviews_interval3'+
					 'reviews_interval4'+
					 'lessons_interval1'+
					 'lessons_interval2'+
					 'lessons_interval3'+
					 'lessons_interval4'+
					 'count_zero'+
					 'review_reset'+
					 'lesson_reset').includes(name)) need_reload = true;
		}

		// Updates the page if nothing too drastic has changed, else reloads the page
		function update_settings(settings) {
				if (need_reload) window.location.reload(false);
				else {
						// Update year order
						var setting = settings.general.reverse_years;
						var state = ($('.heatmaps .charts > .heatmap > .year')[0].innerText == new Date().getFullYear() ? false : true);
						if (setting != state ) {
								// reverse order
								$('.heatmaps .charts').each((i,e)=>{
										var elems = $(e).find('.heatmap');
										var last = $(elems[elems-1]);
										elems.each((i,e)=>{last.before(e);last = $(e);});
								});
						}
						// Update intervals
						setting = settings.general.dashboard_intervals;
						state = ($('.heatmaps .stat.intervals').hasClass('hidden') ? false : true);
						if (setting != state) $('.heatmaps .stat.intervals').toggleClass('hidden');
						// Update level ups
						setting = settings.general.level_ups;
						state = ($('.heatmaps .overlay .level_up_indicators').hasClass('hidden') ? false : true);
						if (setting != state) $('.heatmaps .level_up_indicators').toggleClass('hidden');
						// Update today indicator
						setting = settings.general.today;
						state = ($('.heatmaps .overlay .today').hasClass('hidden') ? false : true);
						if (setting != state) $('.heatmaps .today').toggleClass('hidden');
						// Update custom colors
						$('#heatmapColorsCSSreviews').remove();
						$('#heatmapColorsCSSlessons').remove();
						$('#heatmapIndicatorCSS').remove();
						add_setting_css();
				}
		}

		//-----------------------------------------------------------------------------------------------------------------------------------------------------//
		//-----------------------------------------------------------------------STATICS-----------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------------------------------------------------------------------------//

		// Adds dependencies to the head. For some reason I couldn't add these as "require"s in the top of the script.
		function add_dependencies() {
				wkof.load_script("https://d3js.org/d3.v3.min.js", true)
						.then(function(){wkof.load_script("https://cdn.jsdelivr.net/cal-heatmap/3.3.10/cal-heatmap.min.js", true)})
						.then(function(){wkof.load_css("https://cdn.jsdelivr.net/cal-heatmap/3.3.10/cal-heatmap.css", true);});
		}

		// Adds CSS to head
		function add_css() {
				$('head').append('<style id="heatmapCSS">'+
								 'section.heatmaps {'+
								 '    margin-top: 3px;'+
								 '    padding: 15px 30px;'+
								 '    background-color: ' + (is_dark ? "#232629" : "#d5d5d5") + ';'+
								 '    border-radius: 5px;'+
								 (is_dark ? 'box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.7) !important;' : '')+
								 '}'+
								 '.heatmaps > .buttons {'+
								 '    widht: 100%;'+
								 '    position: relative;'+
								 '}'+
								 '.heatmaps .btn {'+
								 '    position: absolute;'+
								 '    right: -15px;'+
								 '    font-size: 12px;'+
								 '    width: 60px;'+
								 '}'+
								 '.heatmaps .toggle_button {'+
								 '    top: 35px;'+
								 '}'+
								 '.heatmaps .btn p {'+
								 '    font-size: 12px;'+
								 '    display: inline;'+
								 '}'+
								 '.heatmaps .stats {'+
								 '    font-size: 15px;'+
								 '    height: 40px;'+
								 '    padding-top: 4px;'+
								 '    text-align: center;'+
								 '}'+
								 '.heatmaps .stat {'+
								 '    display: inline-block;'+
								 '    width: 33%;'+
								 '    text-align: center;'+
								 '}'+
								 '.heatmaps .year {'+
								 '    text-align: center;'+
								 '    font-size: 24px;'+
								 '    font-weight: bold;'+
								 '    cursor: pointer;'+
								 '}'+
								 '.heatmaps .cal-heatmap-container {'+
								 '    margin: auto;'+
								 '}'+
								 '.heatmaps .graph-label {'+
								 '    fill: ' + (is_dark ? "white" : "#424242") + ' !important;'+
								 '}'+
								 (is_dark ? 'rect[class=""], rect[class=" graph-rect"] {fill: #555555;}' : '')+
								 '.heatmaps .footer {'+
								 '    width: 774px;'+
								 '    margin: auto;'+
								 '    padding-top: 5px;'+
								 '}'+
								 '.heatmaps footer .stat {'+
								 '    width: 33.3%;'+
								 '    display: inline-block;'+
								 '}'+
								 '.heatmaps .footer .intervals {'+
								 '    text-align: left;'+
								 '    color: '+(is_dark ? '#5d5d5d' : '#a5a5a5')+' !important;'+
								 '    font-style: italic;'+
								 '}'+
								 '.heatmaps .collapsed {'+
								 '    visibility: hidden;'+
								 '    height: 15px;'+
								 '}'+
								 '.heatmaps > .hidden {'+
								 '    display: none;'+
								 '}'+
								 '#wkof_ds .ui-dialog[aria-describedby="wkofs_wanikani_heatmap"] .wkof_settings .color_label {'+
								 '    position: absolute;'+
								 '    line-height: 30px;'+
								 '    text-align: center;'+
								 '    text-shadow: none;'+
								 '    background: transparent !important;'+
								 '    width: 80px !important;'+
								 '    left: 50%;'+
								 '    transform: translate(-50%, 0);'+
								 '    box-shadow: none !important;'+
								 '    border: none !important;'+
								 '}'+
								 '#wanikani_heatmap_reset .heatmap_clicked_button_text {'+
								 '    font-style: italic;'+
								 '    font-size: 14px;'+
								 '    margin-left: 10px !important;'+
								 '}'+
								 '.heatmaps .overlay {'+
								 '    position: relative;'+
								 '    height: 100%;'+
								 '    margin: auto;'+
								 '}'+
								 '.heatmaps .overlay div {'+
								 '    position: absolute;'+
								 '    width: 8px;'+
								 '    height: 8px;'+
								 '    border-radius: 3px;'+
								 '}'+
								 '.heatmaps .month_labels {'+
								 '    width: 634px;'+
								 '    position: absolute;'+
								 '    top: 4px;'+
								 '    left: 50%;'+
								 '    transform: translate(-50%, 0);'+
								 '}'+
								 '.heatmaps .month_labels > span {'+
								 '    width: 8.33%;'+
								 '    text-align: center;'+
								 '    font-size: 12px;'+
								 '    display: inline-block;'+
								 '}'+
								 '.heatmaps .hidden {'+
								 '    visibility: hidden;'+
								 '}'+
								 '#wkof_ds .ui-dialog[aria-describedby="wkofs_wanikani_heatmap"] .ui-widget-content label,'+
								 '#wkof_ds .ui-dialog[aria-describedby="wkofs_wanikani_heatmap"] .ui-widget-header a,'+
								 '#wkof_ds .ui-dialog[aria-describedby="wkofs_wanikani_heatmap"] .ui-widget-header span {'+
								 '    color: #222222 !important;'+
								 '}'+
								 '#wkof_ds .ui-dialog[aria-describedby="wkofs_wanikani_heatmap"] select,'+
								 '#wkof_ds .ui-dialog[aria-describedby="wkofs_wanikani_heatmap"] input,'+
								 '#wkof_ds .ui-dialog[aria-describedby="wkofs_wanikani_heatmap"] button {'+
								 '    background: #fff !important;'+
								 '    box-shadow: none !important;'+
								 '    border: 1px solid #ccc !important;'+
								 '    color: #222222 !important;'+
								 '}'+
								 '#wkof_ds .ui-dialog[aria-describedby="wkofs_wanikani_heatmap"] .ui-button .ui-icon {'+
								 '    background-image: url(https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/images/ui-icons_888888_256x240.png) !important;'+
								 '    box-shadow: none !important;'+
								 '}'+
								 'div#wkof_ds .ui-dialog {'+
								 '    box-shadow: 2px 6px 24px -4px rgba(0,0,0,0.25) !important;'+
								 '    background: #f8f8f8 !important;'+
								 '    border: 1px solid #aaaaaa !important;'+
								 '}'+
								 'div#wkof_ds .ui-widget-header {'+
								 '    background: #d5d5d5 !important;'+
								 '    border-radius: 3px !important;'+
								 '    border: 1px solid #dddddd !important;'+
								 '}'+
								 '#wkof_ds .ui-state-active {'+
								 '    border: 1px solid #aaaaaa !important;'+
								 '    background: #e6e6e6 !important;'+
								 '}'+
								 'div#wkof_ds li.ui-state-default {'+
								 '    border: 1px solid #c5c5c5 !important;'+
								 '    background: #f6f6f6 !important;'+
								 '}'+
								 'div#wkof_ds .ui-dialog-buttonpane {'+
								 '    border-top: 1px solid #cccccc !important;'+
								 '}'+
								 '</style>');
		}

		// Installs the CSS for custom settings
		function add_setting_css() {
				var settings = wkof.settings.wanikani_heatmap;
				for (var key in [0, 1]) {
						var type = ["reviews", "lessons"][key];
						if (settings[type].custom_colors) {
								var colors = [];
								for (var i=1; i<=5; i++) colors.push(settings[type]['color'+i])
								$('head').append('<style id=heatmapColorsCSS'+type+'>'+
												 '.'+type+'_heatmaps rect.q1 {'+
												 '    background-color: '+colors[0]+';'+
												 '    fill: '+colors[0]+';'+
												 '}'+
												 '.'+type+'_heatmaps rect.q2 {'+
												 '    background-color: '+colors[1]+';'+
												 '    fill: '+colors[1]+';'+
												 '}'+
												 '.'+type+'_heatmaps rect.q3 {'+
												 '    background-color: '+colors[2]+';'+
												 '    fill: '+colors[2]+';'+
												 '}'+
												 '.'+type+'_heatmaps rect.q4 {'+
												 '    background-color: '+colors[3]+';'+
												 '    fill: '+colors[3]+';'+
												 '}'+
												 '.'+type+'_heatmaps rect.q5 {'+
												 '    background-color: '+colors[4]+';'+
												 '    fill: '+colors[4]+';'+
												 '}'+
												 '</style>');
						}
				}
				$('head').append('<style id="heatmapIndicatorCSS">'+
								 '.overlay .level_up {'+
								 '    border: 2px solid '+settings.general.level_ups_color+';'+
								 '}'+
								 '.overlay .today {'+
								 '    border: 2px solid '+settings.general.today_color+';'+
								 '}'+
								 '</style>');
				$('head').append('<style id="heatmapOtherCSS">'+
								 (settings.general.segment_year ? '' : '.heatmaps .graph-label {display: none;}')+
								 '</style>');
		}

		//-----------------------------------------------------------------------------------------------------------------------------------------------------//
		//------------------------------------------------------------------DATA PROCESSING--------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------------------------------------------------------------------------//

		// Initiates data storage or updates the current review storage
		function store_review_data(reviews_data) {
				var new_data = reviews_data.data;
				if (new_data.length > 0) {
						// Initialise if needed
						if (!("review_data" in stored_data)) {
								stored_data.review_data = {
										days: {},
										first_date: undefined,
										last_date: undefined,
										finished_at: undefined
								}
								stored_data.review_data.first_date = new_data[0].data.created_at;
								stored_data.review_data.last_date = new_data[0].data.created_at;
						}
						var data = stored_data.review_data;
						// Update review data
						for (var key in new_data) {
								var date = new Date(new_data[key].data.created_at);
								var day = days_between(new Date(data.first_date), date);
								if (!data.days[day]) {
										data.days[day] = {date: get_ISO(date), count: 0, streak: (data.days[day-1] ? data.days[day-1].streak : 0)+1, hours: {}};
								}
								data.days[day].count++;
								if (!data.days[day].hours[date.getHours()]) data.days[day].hours[date.getHours()] = 0;
								data.days[day].hours[date.getHours()]++;
								if (date > new Date(data.last_date)) data.last_date = new_data[key].data.created_at;
						}
				}
		}

		function store_lesson_data() {
				// Initialise if needed
				if (!("lesson_data" in stored_data)) {
						stored_data.lesson_data = {
								days: {},
								first_date: undefined,
								last_date: undefined,
								finished_at: undefined
						}
						stored_data.level_ups = {};
				}

				// Update lesson data
				var [promise, resolve] = new_promise();
				var data = stored_data.lesson_data;
				var config = {
						wk_items: {
								options: {assignments: true, include_hidden: true},
								filters: {started_after: (data.last_date || 0)}
						}
				};
				wkof.ready('ItemData').then(()=>{
						wkof.ItemData.get_items(config).then((new_data)=>{
								if (!new_data[0]) resolve();
								if (!data.first_date) data.first_date = data.last_date = new_data[0].assignments.started_at;
								var first_date = new Date(data.first_date);
								var last_date = new Date(data.last_date);
								var pending = {};
								for (var key in new_data) {
										if (new_data[key].assignments.started_at != null) {
												// Regular data
												var date = new Date(new_data[key].assignments.started_at);
												var day = days_between(first_date, date);
												if (!data.days[day]) {
														data.days[day] = {date: get_ISO(date), count: 0, streak: 0, hours: {}};
												}
												data.days[day].count++;
												if (!data.days[day].hours[date.getHours()]) data.days[day].hours[date.getHours()] = 0;
												data.days[day].hours[date.getHours()]++;
												if (date > new Date(data.last_date)) data.last_date = date.toISOString();

												// Pending count
												var day1 = days_between(first_date, new Date(new_data[key].assignments.unlocked_at));
												var day2 = days_between(first_date, new Date(new_data[key].assignments.started_at));
												update_pending(day1, day2, pending);
										}
										else {
												// Pending count
												day1 = days_between(first_date, new Date(new_data[key].assignments.unlocked_at));
												day2 = days_between(first_date, new Date());
												update_pending(day1, day2, pending);
										}
								}
								// Get streaks
								var streak = 0;
								for (day=1; day<days_between(first_date, new Date())+1; day++) {
										if (wkof.settings.wanikani_heatmap.lessons.count_zero) {
												if (new Date(day_to_timestamp(first_date, day)*1000) > last_date){
														if (!data.days[day] && pending[day]) streak = 0;
														else {
																streak++;
																if (data.days[day]) data.days[day].streak = streak;
														}
												}
												else if (data.days[day]) streak = data.days[day].streak
										}
										else {
												if (data.days[day]) {
														if (data.days[day-1]) streak = data.days[day-1].streak + 1;
														else streak = 1;
														data.days[day].streak = streak;
												}
										}
								}
								resolve();
						});
				});

				return promise
		}

		// Updates pending list
		function update_pending(day1, day2, pending) {
				for (var i=day1; i<day2; i++) {
						if (!pending[i]) pending[i] = 0;
						pending[i]++;
				}
		}

		// Updates the level up data with info from the API
		function update_level_ups() {
				var [promise, resolve] = new_promise();
				// If there is nothing stored yet
				if (!stored_data.level_ups[1]) {
						var config = {
								wk_items: {
										options: {assignments: true},
										filters: {item_type: 'rad', level: "1.."+wkof.user.level}
								}
						};
						wkof.ItemData.get_items(config).then((data)=>{
								// Sort by unlock day
								var sorted = {};
								var first_day = Date.parse(data[0].assignments.unlocked_at);
								for (var key in data) {
										if (data[key].assignments) {
												var day = Math.round((Date.parse(data[key].assignments.unlocked_at)-first_day)/ms_day);
												if (!sorted[day]) sorted[day] = [];
												sorted[day].push(data[key]);
										}
								}
								// Check level up date
								var unlocked_at, last_level, item_level= 0;
								for (day in sorted) {
										for (key in sorted[day]) {
												last_level = item_level;
												item_level = sorted[day][key].data.level;
												unlocked_at = new Date(sorted[day][key].assignments.unlocked_at);
												if (item_level == last_level + 1) {
														stored_data.level_ups[item_level] = unlocked_at.toDateString();
												}
												else if (item_level == last_level) {
														if (Date.parse(stored_data.level_ups[item_level]) > unlocked_at) stored_data.level_ups[item_level] = unlocked_at;
												}
												else item_level = last_level;
										}
								}
								return resolve;
						}).then(update_definite_level_ups);
				}
				else update_definite_level_ups(resolve);

				return promise;
		}

		// Updates level data with the data in Apiv2
		function update_definite_level_ups(resolve) {
				wkof.Apiv2.get_endpoint('level_progressions').then((data)=>{
						for (var key in data) {
								var unlock_date = data[key].data.unlocked_at;
								var level = data[key].data.level;
								stored_data.level_ups[level] = new Date(unlock_date).toDateString();
						}

						// Store data when done
						localStorage.setItem(data_storage_key, JSON.stringify(stored_data));

						resolve();
				});
		}

		//-----------------------------------------------------------------------------------------------------------------------------------------------------//
		//----------------------------------------------------------------------HEATMAPS-----------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------------------------------------------------------------------------//

		// Creates the heatmaps and inserts them into the page
		function add_heatmaps() {
				// Create element
				var section = document.createElement('section');
				section.className = "heatmaps";

				var buttons = create_buttons();
				var review_heatmaps = get_heatmaps(stored_data.review_data, "reviews");
				var lesson_heatmaps = get_heatmaps(stored_data.lesson_data, "lessons");
				$(section).append([buttons, review_heatmaps, lesson_heatmaps]);

				$('.progression').after(section);
		}

		// Creates the buttons for opening settings and switching between reviews and lessons
		function create_buttons() {
				var buttons = document.createElement('div');
				buttons.className = 'buttons';

				var settings_button = document.createElement('div');
				settings_button.className = 'settings_button btn';
				settings_button.innerHTML = '<i class="link settings noselect icon-gear"></i><p> Settings</p></div>';
				settings_button.onclick = open_settings;
				buttons.appendChild(settings_button);

				var toggle_button = document.createElement('div');
				toggle_button.className = 'toggle_button btn';
				toggle_button.innerHTML = '<i class="icon-inbox"></i><p> '+(wkof.settings.wanikani_heatmap.visible_heatmap == "reviews" ? "Lessons" : "Reviews")+'</p></div></div>';
				toggle_button.onclick = toggle_lesson_review;
				buttons.appendChild(toggle_button);

				return buttons
		}

		// Returns an element populated with the stats
		function get_heatmaps(data, type) {
				var section = document.createElement('div');
				section.className = type+"_heatmaps heatmaps";
				if (type != wkof.settings.wanikani_heatmap.visible_heatmap) $(section).addClass('hidden');

				var [stats, total] = calculate_stats(data, type);
				var heatmaps = create_heatmaps(data, type);

				// Add footer
				var footer = document.createElement('div');
				footer.className = 'footer total_'+type;
				var intervals = "";
				var settings = wkof.settings.wanikani_heatmap[type];
				intervals = 'Intervals: '+[settings.interval1, settings.interval2, settings.interval3, settings.interval4].join(', ');
				var cls = 'stat intervals' + (wkof.settings.wanikani_heatmap.general.dashboard_intervals ? '' : ' hidden');
				$(footer).append('<div class="'+cls+'">'+intervals+'</div><div class="stat">Total '+type+': '+add_comma(total)+'</div>');
				$(heatmaps).append(footer);

				$(section).append([stats, heatmaps]);

				return section
		}

		// Calculates the stats and returns a stats element
		function calculate_stats(data, type) {
				var days_total = days_between(new Date(data.first_date), new Date());
				var total_reviews = 0, most_studied = {count: 0, date: 0}, days_studied = 0, longest_streak = {streak: 0, end: 0};
				for (var key in data.days) {
						var day = data.days[key];
						total_reviews += day.count;
						days_studied++;
						if (most_studied.count < day.count) most_studied = {count: day.count, date: new Date(day.date).toDateString()};
						if (longest_streak.streak < day.streak) longest_streak = {streak: day.streak, end: day.date};
				}

				var average_total = Math.round(total_reviews/days_total);
				var average_studied = Math.round(total_reviews/days_studied);
				var studied_ratio = Math.round(days_studied/days_total*100)+"%";
				var longest_streak_tooltip = (new Date(longest_streak.end).toDateString() == new Date().toDateString() ? 'Ongoing' : 'Ended on '+new Date(longest_streak.end).toDateString());
				var streak = 0;
				if (type == "reviews") streak = day.streak;
				else {
						var date = new Date(day.date).toDateString();
						var today = new Date().toDateString() == date;
						var yesterday = new Date(Date.parse(new Date().toDateString())-ms_day/2).toDateString() == date;
						if (today || yesterday) {
								if (today && day.streak == 0) streak = (data.days[key-1] ? data.days[key-1].streak : 0);
								else streak = (day.streak ? day.streak : 0);
						}
				}

				var stats = document.createElement('div');
				stats.className = 'stats';

				$(stats).append('<div class="stat">Days studied: '+studied_ratio+' ('+add_comma(days_studied)+' of '+add_comma(days_total)+') </div>');
				$(stats).append('<div class="stat" title="Most done in a day: '+add_comma(most_studied.count)+' on '+most_studied.date+'">Average daily '+type+': '+average_total+' ('+average_studied+' per day studied)</div>');
				$(stats).append('<div class="stat" title="'+longest_streak_tooltip+'">Longest streak: '+add_comma(longest_streak.streak)+' (current '+add_comma(streak)+')</div>');

				return [stats, total_reviews]
		}

		// Creates the heatmap for each year
		function create_heatmaps(data, type) {
				var heatmaps = document.createElement('div');
				heatmaps.className = 'charts';

				var year = new Date(data.first_date).getFullYear();
				var end_year = new Date(data.last_date).getFullYear();
				while (year <= end_year) {
						var year_elem = create_heatmap(year, data, type);
						if (wkof.settings.wanikani_heatmap.general.reverse_years) $(heatmaps).append(year_elem);
						else $(heatmaps).prepend(year_elem);
						year++;
				}

				return heatmaps
		}

		// Creates a heatmap for the given year
		function create_heatmap(year, data, type) {
				// Prepare container
				var heatmap = document.createElement('div');
				$(heatmap).attr({id: "heatmap"+year, class: "heatmap"});
				$(heatmap).append('<div class="year">'+year+'</div>');
				heatmap.children[0].onclick = function(event){$(event.target.nextElementSibling).toggleClass('collapsed'); toggle_collapse(year, type);};

				// Create heatmap
				var settings = wkof.settings.wanikani_heatmap;
				var segment = settings.general.segment_year;
				var legend = [];
				for (var i=1; i<5; i++) legend.push(settings[type]['interval'+i]);
				var chart = new CalHeatMap();
				var chart_elem = document.createElement("div");
				if (is_collapsed(year, type)) chart_elem.className = 'collapsed chart';
				else chart_elem.className = "chart";
				if (!segment) add_month_labels(chart_elem);
				var config = {
						itemSelector: chart_elem,
						start: new Date(year, 0),
						range: (segment ? 12 : 1),
						domain: (segment ? "month" : "year"),
						subDomain: "day",
						data: data.days,
						afterLoadData: days_to_timestamps,
						label: {position: "top"},
						weekStartOnMonday: (settings.general.week_start == "true" ? true : false),
						legend: legend
				}
				chart.init(config);

				// Add level up overlay
				overlay(year, chart_elem);

				$(heatmap).append(chart_elem);
				return heatmap
		}

		// Adds labels in the non-segmented layout
		function add_month_labels(elem) {
				$(elem).append('<div class="month_labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>');
		}

		// Adds an overlay that creates borders around the days on which the user leveled up
		function overlay(year, elem) {
				// I set a timeout so that the chart will be ready when this code runs
				var interval = setInterval(()=>{
						// Set up overlay element
						var overlay = document.createElement('div');
						overlay.className = 'overlay';
						var year_elem = $(elem).find('.cal-heatmap-container')[0];
						if (!year_elem.attributes.width) return;
						else clearInterval(interval);
						var year_width = year_elem.attributes.width.value;
						overlay.style.width = year_width+'px';

						// Add today marker
						if (year == new Date().getFullYear()) {
								$(elem).find('.y_'+year+' title').each((i, e)=>{
										var title = e.innerHTML;
										if (title.includes('items on')) {var items = title.split(' items on')[0]; var title_date = new Date(Date.parse(title.split('items on ')[1])).toDateString()}
										else title_date = new Date(title).toDateString();
										if (title_date == new Date().toDateString()) {
												// Prepare overlay element
												var overlay_elem = document.createElement('div');
												overlay_elem.className = 'today' + (wkof.settings.wanikani_heatmap.general.today ? '' : ' hidden');
												var [x, y] = find_overlay_position(e);
												overlay_elem.title = (items ? items : 0) + ' items today';
												overlay_elem.style.left = x+'px';
												overlay_elem.style.top = y+'px';
												overlay.appendChild(overlay_elem);
										}
								});
						}

						// Add level overlays
						var level_ups = document.createElement('div');
						level_ups.className = 'level_up_indicators' + (wkof.settings.wanikani_heatmap.general.level_ups ? '' : ' hidden');
						$(elem).find('title').each((i, e)=>{
								var title = e.innerHTML;
								if (title.includes('items on')) var title_date = new Date(Date.parse(title.split('items on ')[1])).toDateString()
								else title_date = new Date(title).toDateString();
								if (title_date.slice(-4) == year) {
										for (var level in stored_data.level_ups) {
												if (title_date == stored_data.level_ups[level]) {
														// Prepare level overlay element
														var level_up_elem = document.createElement('div');
														level_up_elem.id = 'level_'+level;
														level_up_elem.className = 'level_up';
														// Find positions
														var [level_up_x, level_up_y] = find_overlay_position(e);
														// Set values
														level_up_elem.title = 'You reached level '+level+'!\n'+title;
														level_up_elem.style.left = level_up_x+'px';
														level_up_elem.style.top = level_up_y+'px';
														level_ups.appendChild(level_up_elem);
												}
										}
								}
						});
						overlay.appendChild(level_ups);

						$(elem).prepend(overlay);
				}, 10);
		}

		// Finds and returns relative coordinates for the element's rect
		function find_overlay_position(e) {
				var day_elem = e.previousElementSibling;
				var month_x = 0;
				if (wkof.settings.wanikani_heatmap.general.segment_year) {
						var month_elem = $(day_elem).closest('.graph-domain')[0];
						month_x = month_elem.attributes.x.value;
				}
				var day_x = day_elem.attributes.x.value;
				var day_y = day_elem.attributes.y.value;
				var x = Number(month_x) + Number(day_x) - 1;
				var y = 25 + Number(day_y) - 1;
				return [x, y];
		}

		//-----------------------------------------------------------------------------------------------------------------------------------------------------//
		//-------------------------------------------------------------------HELP FUNCTIONS--------------------------------------------------------------------//
		//-----------------------------------------------------------------------------------------------------------------------------------------------------//

		// Returns a promise and a resolve function
		function new_promise() {
				var resolve, promise = new Promise((res, rej)=>{resolve = res;});
				return [promise, resolve];
		}

		// Deletes data
		function reset_data(name){
				var type = name.split('_')[0];
				delete stored_data[type+'_data'];
				localStorage.setItem(data_storage_key, JSON.stringify(stored_data));
				if (!this.target.nextElementSibling) $(this.target).after('<span class="heatmap_clicked_button_text">data deleted...</span>');
		}

		// Registers a filter that helps return the correct lesson items
		function register_lesson_filter() {
				var [promise, resolve] = new_promise();
				wkof.ready('ItemData.registry').then(()=>{
						wkof.ItemData.registry.sources.wk_items.filters.started_after = {
								filter_func: function(filter_value, item){
										if (item.assignments.started_at == null && item.assignments.unlocked_at != null) return true;
										if (new Date(filter_value) < new Date(item.assignments.started_at)) return true;
										else return false;
								}
						};
						resolve();
				});
				return promise;
		}

		// Adds commas to a number
		function add_comma(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		// Transforms the data into the format the heatmaps needs
		function days_to_timestamps(data) {
				var heatmap_data = {};
				for (var day in data) heatmap_data[Date.parse(data[day].date)/1000] = data[day].count;
				return heatmap_data;
		}

		// Caluclates the number of days from date1 to date2
		function days_between(d1, d2) {
				if (d1 == "Invalid Date") return 1;
				d1 = new Date(d1.toDateString());
				var diff = d2.getTime()-d1.getTime();
				var tzd = d1.getTimezoneOffset()-d2.getTimezoneOffset();
				diff += tzd*60*1000;
				var days = Math.ceil(diff/ms_day);
				return days;
		}

		// Returns the timestamp in seconds to the given date at time 00:00:00
		function get_ISO(date) {
				return new Date(Date.parse(date.toDateString())+ms_day/2).toISOString();
		}

		// Takes a start day, the day number after that date, and transforms the number into a new date
		function day_to_timestamp(start, day) {
				return new Date(new Date(new Date(start).toDateString()).getTime()+day*ms_day-ms_day/2).getTime()/1000;
		}

		// Checks whether the year is collapsed
		function is_collapsed(year, type) {
				var collapsed_years = wkof.settings.wanikani_heatmap.collapsed;
				if (!(year in collapsed_years[type])) collapsed_years[type][year] = false;
				return collapsed_years[type][year];
		}

		// Updates the stored collapse data after a year has been collapsed or expanded
		function toggle_collapse(year, type) {
				wkof.settings.wanikani_heatmap.collapsed[type][year] = !wkof.settings.wanikani_heatmap.collapsed[type][year];
				wkof.Settings.save('wanikani_heatmap');
		}

		// Toggles between lesson and review heatmaps
		function toggle_lesson_review() {
				$('.reviews_heatmaps').toggleClass('hidden');
				var elem = $('.lessons_heatmaps').toggleClass('hidden');
				$('.heatmaps .buttons .toggle_button p')[0].innerText = elem.hasClass('hidden') ? ' Lessons' : ' Reviews';
				wkof.settings.wanikani_heatmap.visible_heatmap = (wkof.settings.wanikani_heatmap.visible_heatmap == "reviews") ? "lessons" : "reviews";
				wkof.Settings.save('wanikani_heatmap');
		}

		// Updates the label of the color input
		function update_label(name, value) {
				var e = $('#wanikani_heatmap_'+name)[0].previousSibling;
				e.label = value;
				$(e).attr('style', 'color: '+contrast_color(value)+' !important');
		}

		// Choses black or white as a contrast to the given color
		function contrast_color(color) {
				var [r, g, b] = hex_to_rgb(color);
				return (r+b+g)/(255*3) > 0.5 ? '#000000' : '#FFFFFF';
		}

		// Validates hex color, returns boolean
		function validate_hex(hex) {
				return /^#[0-9A-F]{6}$/i.test(hex);
		}

		// Generates new colors from the current colors in the settings
		function generate_colors(name, config) {
				var dialog = config.dialog;
				var type = name.split("_")[0];
				var color1 = wkof.settings.wanikani_heatmap[type].color1;
				var color2 = wkof.settings.wanikani_heatmap[type].color5;
				var colors = interpolate_colors(color1, color2);
				wkof.settings.wanikani_heatmap[type].color2 = colors[1];
				wkof.settings.wanikani_heatmap[type].color3 = colors[2];
				wkof.settings.wanikani_heatmap[type].color4 = colors[3];
				update_label(type+'_color2', colors[1]);
				update_label(type+'_color3', colors[2]);
				update_label(type+'_color4', colors[3]);
				dialog.refresh();
		}

		// Interpolate between two hex colors, returning an array of hex colors
		function interpolate_colors(color1, color2) {
				var color_list = [];
				color1 = hex_to_rgb(color1);
				color2 = hex_to_rgb(color2);
				for(var i = 0; i < 5; i++) color_list.push(rgb_to_hex(interpolate_color(color1, color2, 0.25*i)));
				return color_list;
		}

		// Returns an rgb color interpolation between given rgb colors
		function interpolate_color(color1, color2, factor) {
				var result = color1.slice();
				for (var i = 0; i < 3; i++) result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
				return result;
		};

		// Converts a hex color to rgb
		function hex_to_rgb(hex) {
				var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
				return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
		}

		// Converts an rgb color to hex
		function rgb_to_hex(cols) {
				var rgb = cols[2] | (cols[1] << 8) | (cols[0] << 16);
				return '#' + (0x1000000 + rgb).toString(16).slice(1)
		}

		// Handy little function that rfindley wrote. Checks whether the theme is dark.
		function is_dark_theme() {
				// Grab the <html> background color, average the RGB.  If less than 50% bright, it's dark theme.
				return $('body').css('background-color').match(/\((.*)\)/)[1].split(',').slice(0,3).map(str => Number(str)).reduce((a, i) => a+i)/(255*3) < 0.5;
		}
})(window.jQuery, window.wkof);